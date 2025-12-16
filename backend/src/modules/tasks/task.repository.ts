import { prisma } from "../../lib/prisma.js";
import type { TaskQueryInput } from "./task.dto.js";

export class TaskRepository {
  static create(data: any) {
    return prisma.task.create({ data });
  }

  static findById(taskId: string) {
    return prisma.task.findUnique({ where: { id: taskId } });
  }

  static update(taskId: string, data: any) {
    return prisma.task.update({
      where: { id: taskId },
      data,
    });
  }

  static delete(taskId: string) {
    return prisma.task.delete({ where: { id: taskId } });
  }

  static findAllForUser(userId: string, query: TaskQueryInput) {
    return prisma.task.findMany({
      where: {
        OR: [
          { assignedToId: userId },
          { creatorId: userId },
        ],
        status: query.status,
        priority: query.priority,
      },
      orderBy: query.sortByDueDate
        ? { dueDate: query.sortByDueDate }
        : undefined,
    });
  }

  static findOverdue(userId: string) {
    return prisma.task.findMany({
      where: {
        assignedToId: userId,
        dueDate: { lt: new Date() },
        status: { not: "COMPLETED" },
      },
    });
  }
}
