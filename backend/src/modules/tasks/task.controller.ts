import type { Request, Response } from "express";
import { TaskService } from "./task.service.js";
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskQueryDto,
} from "./task.dto.js";
import { prisma } from "../../lib/prisma.js";
import { io } from "../../index.js";
import { TaskStatusAuditRepository } from "../audits/task-status-audit.repository.js";


export class TaskController {
  static async create(req: Request, res: Response) {
    const parsed = CreateTaskDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const task = await TaskService.createTask(
      req.user!.id,
      parsed.data
    );

      // 🔔 notification (side effect)
    await prisma.notification.create({
      data: {
        userId: task.assignedToId,
        message: `You were assigned task: ${task.title}`,
      },
    });

    // ⚡ socket events
    io.to(task.assignedToId).emit("task:assigned", {
      taskId: task.id,
      message: `You were assigned task: ${task.title}`,
    });

    io.emit("task:updated", task);


    res.status(201).json(task);
  }

 static async update(req: Request, res: Response) {
  const parsed = UpdateTaskDto.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const userId = req.user!.id; // who is updating

  // 1️⃣ Get existing task FIRST (to capture old status)
  const existingTask = await TaskService.getTaskById(req.params.id);

  // 2️⃣ Update task
  const task = await TaskService.updateTask(
    req.params.id,
    parsed.data
  );

  // 3️⃣ AUDIT LOG (ONLY if status changed)
  if (
    parsed.data.status &&
    parsed.data.status !== existingTask.status
  ) {
    await TaskStatusAuditRepository.create({
      taskId: task.id,
      updatedBy: userId,
      oldStatus: existingTask.status,
      newStatus: parsed.data.status,
    });
  }

  // 4️⃣ Live update for all users
  io.emit("task:updated", task);

  // 5️⃣ Notify if reassigned
  if (
    parsed.data.assignedToId &&
    parsed.data.assignedToId !== existingTask.assignedToId
  ) {
    await prisma.notification.create({
      data: {
        userId: parsed.data.assignedToId,
        message: `You were assigned task: ${task.title}`,
      },
    });

    io.to(parsed.data.assignedToId).emit("task:assigned", {
      taskId: task.id,
      message: `You were assigned task: ${task.title}`,
    });
  }

  res.json(task);
}


  static async remove(req: Request, res: Response) { 
    await TaskService.deleteTask(req.params.id);
    res.status(204).send("Task Deleted");
  }

  static async getAll(req: Request, res: Response) {
    const parsed = TaskQueryDto.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const tasks = await TaskService.getUserTasks(
      req.user!.id,
      parsed.data
    );

    res.json(tasks);
  }


}
