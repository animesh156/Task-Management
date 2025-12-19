import type { CreateTaskInput, UpdateTaskInput, TaskQueryInput } from "./task.dto.js";
export declare class TaskService {
    static createTask(userId: string, data: CreateTaskInput): Promise<{
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
    }>;
    static updateTask(taskId: string, data: UpdateTaskInput): Promise<{
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
    }>;
    static deleteTask(taskId: string): Promise<void>;
    static getUserTasks(userId: string, query: TaskQueryInput): Promise<{
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
//# sourceMappingURL=task.service.d.ts.map