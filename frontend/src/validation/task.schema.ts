import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string(),
  dueDate: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]),
  assignedToId: z.string().uuid(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
