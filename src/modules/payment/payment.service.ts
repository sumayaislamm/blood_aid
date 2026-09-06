
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

export const createStripeCheckoutSession = async (
  userId: string,
  donationId: string
) => {
  const donation = await prisma.donation.findUnique({
    where: {
      id: donationId,
    },
    include: {
      bloodRequest: true,
      donor: true,
    },
  });

  if (!donation) {
    throw new Error("Donation not found");
  }

  if (donation.donorId !== userId) {
    throw new Error("You can only pay for your own donation");
  }

  if (donation.status === "CANCELLED") {
    throw new Error("Cancelled donation cannot be paid");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: "Blood Donation Payment",
            description: `Donation for ${donation.bloodRequest.hospitalName}`,
          },
          unit_amount: 100 * 100,
        },
        quantity: donation.units,
      },
    ],

    metadata: {
      donationId: donation.id,
      donorId: donation.donorId,
    },

    success_url: "http://localhost:5000/payment/success",
    cancel_url: "http://localhost:5000/payment/cancel",
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
};