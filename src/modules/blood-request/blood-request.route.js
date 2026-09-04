import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createRequest, getAllRequests, getRequestById } from "./blood-request.controller";
const router = Router();
router.post("/", authenticate, authorize("REQUESTER"), createRequest);
router.get("/", authenticate, getAllRequests);
router.get("/:id", authenticate, getRequestById);
export default router;
//# sourceMappingURL=blood-request.route.js.map