import { TaskService } from "./task.service.js";
import { CreateTaskDto, UpdateTaskDto, TaskQueryDto, } from "./task.dto.js";
export class TaskController {
    static async create(req, res) {
        const parsed = CreateTaskDto.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error);
        }
        const task = await TaskService.createTask(req.user.id, parsed.data);
        res.status(201).json(task);
    }
    static async update(req, res) {
        const parsed = UpdateTaskDto.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error);
        }
        const task = await TaskService.updateTask(req.params.id, parsed.data);
        res.json(task);
    }
    static async remove(req, res) {
        await TaskService.deleteTask(req.params.id);
        res.status(204).send("Task Deleted");
    }
    static async getAll(req, res) {
        const parsed = TaskQueryDto.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json(parsed.error);
        }
        const tasks = await TaskService.getUserTasks(req.user.id, parsed.data);
        res.json(tasks);
    }
}
//# sourceMappingURL=task.controller.js.map