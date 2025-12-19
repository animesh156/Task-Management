import { prisma } from "../../lib/prisma.js";
export class TaskRepository {
    static create(data) {
        return prisma.task.create({ data });
    }
    static findById(taskId) {
        return prisma.task.findUnique({ where: { id: taskId } });
    }
    static update(taskId, data) {
        return prisma.task.update({
            where: { id: taskId },
            data,
        });
    }
    static delete(taskId) {
        return prisma.task.delete({ where: { id: taskId } });
    }
    static findAllForUser(userId, query) {
        const where = {};
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
            if (query.status)
                where.status = query.status;
        }
        if (query.priority)
            where.priority = query.priority;
        const args = { where };
        if (query.sortByDueDate) {
            args.orderBy = { dueDate: query.sortByDueDate };
        }
        return prisma.task.findMany(args);
    }
}
//# sourceMappingURL=task.repository.js.map