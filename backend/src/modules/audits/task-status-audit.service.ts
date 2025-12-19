import { TaskStatusAuditRepository } from "./task-status-audit.repository.js";

export class TaskStatusAuditService {
  static async getMyStatusAuditLogs() {
    return TaskStatusAuditRepository.findForUser();
  }
}
