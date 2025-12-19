import { TaskRepository } from "./task.repository.js";
import type { CreateTaskInput, UpdateTaskInput, TaskQueryInput } from "./task.dto.ts";
import { prisma } from "../../lib/prisma.js";
import { io } from "../../index.js";

export class TaskService {
  static async createTask(userId: string, data: CreateTaskInput) {
    if (new Date(data.dueDate) < new Date()) {
      throw new Error("Due date cannot be in the past");
    }

    // 1️⃣ Create task
    const task = await TaskRepository.create({
      ...data,
      dueDate: new Date(data.dueDate),
      creatorId: userId,
    });

    

    return task;
  }

  static async updateTask(taskId: string, data: UpdateTaskInput) {
    const updatedTask = await TaskRepository.update(taskId, data);

    return updatedTask;
  }

  static async deleteTask(taskId: string) {
    await TaskRepository.delete(taskId);
  }

  static async getUserTasks(userId: string, query: TaskQueryInput) {
    return TaskRepository.findAllForUser(userId, query);
  }

  static async getTaskById(taskId: string) {
  const task = await TaskRepository.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
}


}
