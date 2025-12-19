import { TaskStatusAuditRepository } from "./task-status-audit.repository.js";

export class TaskStatusAuditService {
  static async getMyStatusAuditLogs() {
    const logs = await TaskStatusAuditRepository.findForUser();

    return logs.map((log) => ({
      name: log.user.name,
      title: log.task.title,
      createdAt: log.createdAt,
      oldStatus: log.oldStatus,
      newStatus: log.newStatus,
    }));
  }
}
