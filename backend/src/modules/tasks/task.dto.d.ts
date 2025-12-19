import { z } from "zod";
export declare const CreateTaskDto: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodString;
    priority: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>;
    status: z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>;
    assignedToId: z.ZodString;
}, z.core.$strip>;
export declare const UpdateTaskDto: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>>;
    assignedToId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const TaskQueryDto: z.ZodObject<{
    view: z.ZodOptional<z.ZodEnum<{
        assigned: "assigned";
        created: "created";
        overdue: "overdue";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        REVIEW: "REVIEW";
        COMPLETED: "COMPLETED";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    sortByDueDate: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type CreateTaskInput = z.infer<typeof CreateTaskDto>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;
export type TaskQueryInput = z.infer<typeof TaskQueryDto>;
//# sourceMappingURL=task.dto.d.ts.map