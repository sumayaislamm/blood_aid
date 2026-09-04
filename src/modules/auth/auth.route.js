import { Router } from "express";
import { getMe, login, register, updateMe } from "./auth.controller";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.patch("/me", authenticate, updateMe);
router.get("/admin-test", authenticate, authorize("ADMIN"), (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin access granted",
    });
});
export default router;
//# sourceMappingURL=auth.route.js.map