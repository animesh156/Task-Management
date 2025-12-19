import { Router } from "express";
import { UserController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = Router();
router.get("/", authMiddleware, UserController.getAll);
router.get("/me", authMiddleware, UserController.getProfile);
router.put("/me", authMiddleware, UserController.updateProfile);
export default router;
//# sourceMappingURL=user.routes.js.map