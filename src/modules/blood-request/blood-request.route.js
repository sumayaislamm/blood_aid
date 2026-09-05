import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createRequest, deleteRequest, getAllRequests, getRequestById, getRequestResponses, updateRequest } from "./blood-request.controller";
const router = Router();
router.post("/", authenticate, authorize("REQUESTER"), createRequest);
router.get("/", authenticate, getAllRequests);
router.get("/:id/responses", authenticate, authorize("REQUESTER"), getRequestResponses);
router.get("/:id", authenticate, getRequestById);
router.patch("/:id", authenticate, authorize("REQUESTER"), updateRequest);
router.delete("/:id", authenticate, authorize("REQUESTER"), deleteRequest);
export default router;
//# sourceMappingURL=blood-request.route.js.map