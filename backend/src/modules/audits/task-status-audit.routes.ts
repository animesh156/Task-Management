import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { TaskStatusAuditController } from "./task-status-audit.controller.js";

const router = Router();

router.get(
  "/status",
  TaskStatusAuditController.getMyStatusLogs
);

export default router;
