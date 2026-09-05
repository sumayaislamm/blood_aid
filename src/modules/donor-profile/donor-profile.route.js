import { Router } from "express";
import { authenticate, authorize, } from "../../middlewares/auth.middleware";
import { createProfile, getMyProfile, updateMyProfile } from "./donor-profile.controller";
const router = Router();
router.post("/", authenticate, authorize("DONOR"), createProfile);
// Get donor profile by userId
router.get("/me", authenticate, authorize("DONOR"), getMyProfile);
// Update donor profile by userId
router.patch("/me", authenticate, authorize("DONOR"), updateMyProfile);
export default router;
//# sourceMappingURL=donor-profile.route.js.map