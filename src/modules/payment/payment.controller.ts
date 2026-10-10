
import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
import { stripe } from "../../lib/stripe.js";
import { createPayment, getMyPayments } from "./payment.service.js";

export const initiatePayment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payment = await createPayment(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Payment initiated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const handleStripeWebhook = async (
  req: Request,
  res: Response
) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({
      success: false,
      message: "Stripe webhook secret is not configured",
    });
  }

  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).json({
      success: false,
      message: "Missing Stripe signature",
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error(
      "Stripe webhook signature verification failed:",
      error
    );

    return res.status(400).json({
      success: false,
      message: "Invalid Stripe webhook signature",
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Payment must actually be paid before updating the database
      if (session.payment_status !== "paid") {
        return res.status(200).json({
          success: true,
          received: true,
        });
      }

      const paymentId = session.metadata?.paymentId;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: "Payment ID missing from Stripe session metadata",
        });
      }

      const payment = await prisma.payment.findUnique({
        where: {
          id: paymentId,
        },
      });

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      // Idempotency: do not update an already-paid payment again
      if (payment.status !== PaymentStatus.PAID) {
        await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: PaymentStatus.PAID,
            paidAt: new Date(),
            transactionId: session.id,
          },
        });
      }
    }

    return res.status(200).json({
      success: true,
      received: true,
    });
  } catch (error) {
    console.error(
      "Stripe webhook processing failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};

export const getPaymentById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        id: String(req.params.id),
        requesterId: req.user.userId,
      },
      include: {
        bloodRequest: {
          select: {
            id: true,
            bloodGroup: true,
            units: true,
            amount: true,
            hospitalName: true,
            city: true,
            status: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment retrieved successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyPaymentsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payments = await getMyPayments(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};


export const verifyStripeSession = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const sessionId = req.query.session_id;

    if (
      typeof sessionId !== "string" ||
      !sessionId.startsWith("cs_")
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid Stripe session ID is required",
      });
    }

    // Retrieve the session directly from Stripe's server API.
    const session = await stripe.checkout.sessions.retrieve(
      sessionId
    );

    const paymentId = session.metadata?.paymentId;
    const requesterId = session.metadata?.requesterId;
    const bloodRequestId = session.metadata?.bloodRequestId;

    if (!paymentId || !requesterId || !bloodRequestId) {
      return res.status(400).json({
        success: false,
        message: "Payment metadata is incomplete",
      });
    }

    // The signed-in requester must own this Stripe session.
    if (requesterId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot verify another user's payment",
      });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        requesterId: req.user.userId,
        bloodRequestId,
        provider: "STRIPE",
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Ensure this session belongs to the stored payment.
    if (
      payment.transactionId !== session.id ||
      session.client_reference_id !== payment.id ||
      session.currency?.toLowerCase() !==
        payment.currency.toLowerCase() ||
      session.amount_total !==
        Math.round(Number(payment.amount) * 100)
    ) {
      return res.status(400).json({
        success: false,
        message: "Stripe session does not match this payment",
      });
    }

    // Only mark it paid when Stripe confirms the payment.
    if (
      session.payment_status === "paid" &&
      payment.status !== PaymentStatus.PAID
    ) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.PAID,
          paidAt: new Date(),
          transactionId: session.id,
        },
      });
    }

    const updatedPayment = await prisma.payment.findUnique({
      where: { id: payment.id },
    });

    return res.status(200).json({
      success: true,
      message:
        updatedPayment?.status === PaymentStatus.PAID
          ? "Payment verified"
          : "Payment is still being confirmed",
      data: {
        paymentId: payment.id,
        status: updatedPayment?.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
