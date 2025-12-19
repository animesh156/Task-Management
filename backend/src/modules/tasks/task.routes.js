import { Router } from "express";
import { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = Router();
router.use(authMiddleware);
router.post("/", TaskController.create);
router.get("/", TaskController.getAll);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.remove);
export default router;
//# sourceMappingURL=task.routes.js.map