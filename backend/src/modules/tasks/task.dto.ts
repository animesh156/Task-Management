import { z } from "zod";

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string(),
  dueDate: z.string().datetime(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),
  assignedToId: z.string().uuid(),
});

export const UpdateTaskDto = CreateTaskDto.partial();


export const TaskQueryDto = z.object({
  view: z.enum(["assigned", "created", "overdue"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  sortByDueDate: z.enum(["asc", "desc"]).optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskDto>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskDto>;
export type TaskQueryInput = z.infer<typeof TaskQueryDto>;
