import express from "express";
import authRoutes from "./modules/auth/auth.route";
import bloodRequestRoutes from "./modules/blood-request/blood-request.route";
import donorProfileRoutes from "./modules/donor-profile/donor-profile.route";
import donorResponseRoutes from "./modules/donor-response/donor-response.route";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Blood Aid API is running",
  });
});


//auth routes

app.use("/api/auth", authRoutes);

//blood request routes

app.use("/api/blood-requests", bloodRequestRoutes);

// donor profile routes
app.use("/api/donor-profile", donorProfileRoutes);
//donor response routes
app.use("/api/donor-responses", donorResponseRoutes);

//route not found handler

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



export default app;