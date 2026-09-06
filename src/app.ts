import express from "express";
import authRoutes from "./modules/auth/auth.route";
import bloodRequestRoutes from "./modules/blood-request/blood-request.route";
import donorProfileRoutes from "./modules/donor-profile/donor-profile.route";
import donorResponseRoutes from "./modules/donor-response/donor-response.route";
import donationRoutes from "./modules/donation/donation.route";
import { errorHandler } from "./middlewares/error.middleware";
import { authRateLimiter } from "./middlewares/rate-limit.middleware";
import paymentRoutes from "./modules/payment/payment.route";
import { handleStripeWebhook } from "./modules/payment/payment.controller";

const app = express();
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Blood Aid API is running",
  });
});


//auth routes

app.use("/api/auth", authRateLimiter, authRoutes);

//blood request routes

app.use("/api/blood-requests", bloodRequestRoutes);

// donor profile routes
app.use("/api/donor-profile", donorProfileRoutes);
//donor response routes
app.use("/api/donor-responses", donorResponseRoutes);
//donation routes
app.use("/api/donations", donationRoutes);
//payment routes
app.use("/api/payments", paymentRoutes);

//error handler middleware
app.use(errorHandler);
//route not found handler

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



export default app;