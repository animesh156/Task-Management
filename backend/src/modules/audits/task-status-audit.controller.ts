import type { Request, Response } from "express";
import { TaskStatusAuditService } from "./task-status-audit.service.js";

export class TaskStatusAuditController {
  static async getMyStatusLogs(req: Request, res: Response) {
    const logs = await TaskStatusAuditService.getMyStatusAuditLogs();
    res.json(logs);
  }
}
