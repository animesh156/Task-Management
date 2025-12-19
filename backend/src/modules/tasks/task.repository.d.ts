import type { TaskQueryInput } from "./task.dto.js";
export declare class TaskRepository {
    static create(data: any): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        dueDate: Date;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedToId: string;
        creatorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    static findById(taskId: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        dueDate: Date;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedToId: string;
        creatorId: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    static update(taskId: string, data: any): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        dueDate: Date;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedToId: string;
        creatorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    static delete(taskId: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        dueDate: Date;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedToId: string;
        creatorId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    static findAllForUser(userId: string, query: TaskQueryInput): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        dueDate: Date;
        priority: import(".prisma/client").$Enums.TaskPriority;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedToId: string;
        creatorId: string;
    }[]>;
}
//# sourceMappingURL=task.repository.d.ts.map