import { TaskService } from "./task.service.js";
import { TaskRepository } from "./task.repository.js";
import { prisma } from "../../lib/prisma.js";

describe("TaskService.createTask", () => {
  const userId = "user-uuid";

  const validTask = {
    title: "Test task",
    description: "Test description",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: "MEDIUM",
    status: "TODO",
    assignedToId: "assigned-uuid",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates task when input is valid", async () => {
    (TaskRepository.create as jest.Mock).mockResolvedValue({
      id: "task-id",
      ...validTask,
      creatorId: userId,
      dueDate: new Date(validTask.dueDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await TaskService.createTask(userId, validTask as any);

    expect(TaskRepository.create).toHaveBeenCalled();
    expect(prisma.notification.create).toHaveBeenCalled();
    expect(result.id).toBe("task-id");
  });

  it("throws error when due date is in the past", async () => {
    await expect(
      TaskService.createTask(userId, {
        ...validTask,
        dueDate: new Date(Date.now() - 1000).toISOString(),
      } as any)
    ).rejects.toThrow("Due date cannot be in the past");

    expect(TaskRepository.create).not.toHaveBeenCalled();
  });

  it("propagates repository errors", async () => {
    (TaskRepository.create as jest.Mock).mockRejectedValue(
      new Error("DB failure")
    );

    await expect(
      TaskService.createTask(userId, validTask as any)
    ).rejects.toThrow("DB failure");
  });
});
