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
  const where: any = {};

  
  if (query.view === "assigned") {
    where.assignedToId = userId;
  }

  if (query.view === "created") {
    where.creatorId = userId;
  }

  if (query.view === "overdue") {
    where.assignedToId = userId;
    where.dueDate = { lt: new Date() };
    where.status = { not: "COMPLETED" };
  }

  if (query.view !== "overdue") {
    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
  }

  

  const args: any = { where };

  if (query.sortByDueDate) {
    args.orderBy = { dueDate: query.sortByDueDate };
  }

  return prisma.task.findMany(args);
}


}