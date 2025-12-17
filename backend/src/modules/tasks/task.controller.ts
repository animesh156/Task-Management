import type { Request, Response } from "express";
import { TaskService } from "./task.service.js";
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskQueryDto,
} from "./task.dto.js";

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

    res.status(201).json(task);
  }

  static async update(req: Request, res: Response) {
    const parsed = UpdateTaskDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const task = await TaskService.updateTask(
      req.params.id,
      parsed.data
    );

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
