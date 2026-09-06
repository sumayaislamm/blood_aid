import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { createPayment } from "./payment.service";

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

export const handleStripeWebhook = async(
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
    console.error("Stripe webhook signature verification failed:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid Stripe webhook signature",
    });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

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
    console.error("Stripe webhook processing failed:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};