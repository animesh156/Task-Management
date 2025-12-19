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

    // 2️⃣ Create persistent notification
    await prisma.notification.create({
      data: {
        userId: data.assignedToId,
        message: `You were assigned task: ${task.title}`,
      },
    });

    // 3️⃣ Emit real-time notification
    io.to(data.assignedToId).emit("task:assigned", {
      taskId: task.id,
      message: `You were assigned task: ${task.title}`,
    });

    // 4️⃣ Update task lists in real-time
    io.emit("task:updated", task);

    return task;
  }

  static async updateTask(taskId: string, data: UpdateTaskInput) {
    const updatedTask = await TaskRepository.update(taskId, data);

    // Live update for all users
    io.emit("task:updated", updatedTask);

    // Only notify if reassigned
    if (data.assignedToId) {
      await prisma.notification.create({
        data: {
          userId: data.assignedToId,
          message: `You were assigned task: ${updatedTask.title}`,
        },
      });

      io.to(data.assignedToId).emit("task:assigned", {
        taskId: updatedTask.id,
        message: `You were assigned task: ${updatedTask.title}`,
      });
    }

    return updatedTask;
  }

  static async deleteTask(taskId: string) {
    await TaskRepository.delete(taskId);
  }

  static async getUserTasks(userId: string, query: TaskQueryInput) {
    return TaskRepository.findAllForUser(userId, query);
  }
}
