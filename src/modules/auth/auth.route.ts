
import { Router } from "express";

import { getMe, googleAuth, login, register, updateMe } from "./auth.controller.js";

import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";

import {
  registerSchema,
  loginSchema,
  googleLoginSchema,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/google",
  validate(googleLoginSchema),
  googleAuth
);

router.get("/me", authenticate, getMe);

router.patch("/me", authenticate, updateMe);

router.get(
  "/admin-test",
  authenticate,
  authorize("ADMIN"),
  (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted",
    });
  }
);

export default router;