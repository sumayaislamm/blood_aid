import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { validate, } from "../../middlewares/validation.middleware";
import {
  getUsers,
  changeUserStatus,
  verifyDonationController,
  updateAdminBloodRequestStatusController,
  getAdminBloodRequestsController,
  getAdminDonationsController,
  getAdminPaymentsController,
} from "./admin.controller";
import {
    getAdminBloodRequestsQuerySchema,
  getAdminDonationsQuerySchema,
  getAdminPaymentsQuerySchema,
  getUsersQuerySchema,
  updateBloodRequestStatusSchema,
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

router.patch(
  "/donations/:id/verify",
  authenticate,
  authorize("ADMIN"),
  verifyDonationController
);

router.get(
  "/blood-requests",
  authenticate,
  authorize("ADMIN"),
  validate(getAdminBloodRequestsQuerySchema),
  getAdminBloodRequestsController
);

router.patch(
  "/blood-requests/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updateBloodRequestStatusSchema),
  updateAdminBloodRequestStatusController
);
router.get(
  "/donations",
  authenticate,
  authorize("ADMIN"),
  validate(getAdminDonationsQuerySchema),
  getAdminDonationsController
);
router.get(
  "/payments",
  authenticate,
  authorize("ADMIN"),
  validate(getAdminPaymentsQuerySchema),
  getAdminPaymentsController
);

export default router;