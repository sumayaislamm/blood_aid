import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import {
  getUsers,
  changeUserStatus,
} from "./admin.controller";
import {
  getUsersQuerySchema,
  updateUserStatusSchema,
} from "./admin.validation";

const router = Router();

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validate(getUsersQuerySchema),
  getUsers
);

router.patch(
  "/users/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updateUserStatusSchema),
  changeUserStatus
);

export default router;