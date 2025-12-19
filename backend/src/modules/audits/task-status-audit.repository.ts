import { prisma } from "../../lib/prisma.js";
import type { TaskStatus } from "@prisma/client";

export class TaskStatusAuditRepository {
  static create(data: {
    taskId: string;
    updatedBy: string;
    oldStatus: TaskStatus;
    newStatus: TaskStatus;
  }) {
    return prisma.taskStatusAudit.create({ data });
  }

  static findForUser() {
    return prisma.taskStatusAudit.findMany({
      orderBy: { createdAt: "desc" },
       include: {
        task: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      }
    });
  }
}
