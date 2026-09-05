import { Router } from "express";
import { authenticate, authorize, } from "../../middlewares/auth.middleware";
import { createDonationController, getDonationByIdController, getMyDonationsController } from "./donation.controller";
import { createDonationSchema } from "./donation.validation";
import { validate } from "../../middlewares/validation.middleware";
const router = Router();
router.post("/response/:responseId", authenticate, authorize("DONOR"), validate(createDonationSchema), createDonationController);
router.get("/my-donations", authenticate, authorize("DONOR"), getMyDonationsController);
router.get("/:id", authenticate, authorize("DONOR"), getDonationByIdController);
export default router;
//# sourceMappingURL=donation.route.js.map