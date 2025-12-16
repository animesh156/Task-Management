import { TaskRepository } from "./task.repository.js";
import type {
  CreateTaskInput,
  UpdateTaskInput,
  TaskQueryInput,
} from "./task.dto.js";
import { prisma } from "../../lib/prisma.js";

export class TaskService {
  static async createTask(userId: string, data: CreateTaskInput) {
    if (new Date(data.dueDate) < new Date()) {
      throw new Error("Due date cannot be in the past");
    }

    const task = await TaskRepository.create({
      ...data,
      dueDate: new Date(data.dueDate),
      creatorId: userId,
    });

    return task;
  }

  static async updateTask(taskId: string, data: UpdateTaskInput) {
    const task = await TaskRepository.update(taskId, data);

    return task;
  }

  static async deleteTask(taskId: string) {
    await TaskRepository.delete(taskId);
  }

  static async getUserTasks(userId: string, query: TaskQueryInput) {
    return TaskRepository.findAllForUser(userId, query);
  }

  static async getOverdueTasks(userId: string) {
    return TaskRepository.findOverdue(userId);
  }
}
