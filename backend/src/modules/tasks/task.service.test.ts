/* 🔥 Mock repository ONLY (CommonJS-compatible) */
jest.mock("./task.repository", () => ({
  TaskRepository: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAllForUser: jest.fn(),
  },
}));

const { TaskService } = require("./task.service");
const { TaskRepository } = require("./task.repository");

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

  // ✅ strongly typed mock (safe + clean)
  const mockCreate =
    TaskRepository.create as jest.MockedFunction<
      typeof TaskRepository.create
    >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates task when input is valid", async () => {
    mockCreate.mockResolvedValue({
      id: "task-id",
      ...validTask,
      creatorId: userId,
      dueDate: new Date(validTask.dueDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any); // ✅ OK in unit tests

    const result = await TaskService.createTask(
      userId,
      validTask as any
    );

    expect(mockCreate).toHaveBeenCalledWith({
      ...validTask,
      dueDate: expect.any(Date),
      creatorId: userId,
    });

    expect(result.id).toBe("task-id");
  });

  it("throws error when due date is in the past", async () => {
    const invalidTask = {
      ...validTask,
      dueDate: new Date(Date.now() - 1000).toISOString(),
    };

    await expect(
      TaskService.createTask(userId, invalidTask as any)
    ).rejects.toThrow("Due date cannot be in the past");

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("propagates repository errors", async () => {
    mockCreate.mockRejectedValue(new Error("DB failure"));

    await expect(
      TaskService.createTask(userId, validTask as any)
    ).rejects.toThrow("DB failure");
  });
});
