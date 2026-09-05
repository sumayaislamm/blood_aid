import { Router } from "express";
import { authenticate, authorize, } from "../../middlewares/auth.middleware";
import { createResponse, getMyResponses, updateMyResponse, updateResponseStatus } from "./donor-response.controller";
const router = Router();
router.post("/", authenticate, authorize("DONOR"), createResponse);
router.get("/my-responses", authenticate, authorize("DONOR"), getMyResponses);
router.patch("/:id/status", authenticate, authorize("REQUESTER"), updateResponseStatus);
router.patch("/:id", authenticate, authorize("DONOR"), updateMyResponse);
export default router;
//# sourceMappingURL=donor-response.route.js.map