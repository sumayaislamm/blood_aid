import { PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

interface CreatePaymentInput {
  bloodRequestId: string;
  provider: PaymentProvider;
}

export const createPayment = async (
  requesterId: string,
  data: CreatePaymentInput
) => {
  const bloodRequest = await prisma.bloodRequest.findFirst({
    where: {
      id: data.bloodRequestId,
      requesterId,
      deletedAt: null,
    },
    include: {
      requester: true,
    },
  });

  if (!bloodRequest) {
    throw new Error(
      "Blood request not found or you do not have permission to pay for it"
    );
  }

  if (Number(bloodRequest.amount) <= 0) {
    throw new Error("Blood request amount must be greater than 0");
  }

  if (data.provider === PaymentProvider.BKASH) {
    throw new Error("bKash payment integration is not implemented yet");
  }

  const existingPayment = await prisma.payment.findFirst({
    where: {
      requesterId,
      bloodRequestId: data.bloodRequestId,
      provider: data.provider,
      status: {
        in: [PaymentStatus.PENDING, PaymentStatus.PAID],
      },
    },
  });

  if (existingPayment) {
    throw new Error(
      "An active payment already exists for this blood request"
    );
  }

  const payment = await prisma.payment.create({
    data: {
      requesterId,
      bloodRequestId: data.bloodRequestId,
      amount: bloodRequest.amount,
      currency: "BDT",
      provider: data.provider,
      status: PaymentStatus.PENDING,
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: bloodRequest.requester.email,

      client_reference_id: payment.id,

      line_items: [
        {
          price_data: {
            currency: "bdt",

            product_data: {
              name: "Blood Request Payment",
              description: `Payment for blood request at ${bloodRequest.hospitalName}`,
            },

            unit_amount: Math.round(
              Number(bloodRequest.amount) * 100
            ),
          },

          quantity: 1,
        },
      ],

      metadata: {
        paymentId: payment.id,
        bloodRequestId: bloodRequest.id,
        requesterId,
      },

      success_url:
        process.env.STRIPE_SUCCESS_URL ||
        "http://localhost:5000/api/payments/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        process.env.STRIPE_CANCEL_URL ||
        "http://localhost:5000/api/payments/cancel",
    });

    await prisma.payment.update({
      where: {
        id: payment.id,
      },

      data: {
        transactionId: session.id,
      },
    });

    return {
      paymentId: payment.id,
      provider: payment.provider,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      sessionId: session.id,
      checkoutUrl: session.url,
    };
  } catch (error) {
    await prisma.payment.update({
      where: {
        id: payment.id,
      },

      data: {
        status: PaymentStatus.FAILED,
      },
    });

    throw error;
  }
};