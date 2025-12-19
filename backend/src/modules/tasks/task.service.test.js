import { jest } from "@jest/globals";
/* 🔥 Mock ONLY the repository */
jest.mock("./task.repository.js", () => ({
    TaskRepository: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findAllForUser: jest.fn(),
    },
}));
import { TaskService } from "./task.service.js";
import { TaskRepository } from "./task.repository.js";
describe("TaskService.createTask", () => {
    const userId = "user-uuid";
    const validTask = {
        title: "Test task",
        description: "Test description",
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // future
        priority: "MEDIUM",
        status: "TODO",
        assignedToId: "assigned-uuid",
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // ✅ TEST 1: Success
    it("creates task when input is valid", async () => {
        TaskRepository.create.mockResolvedValue({
            id: "task-id",
            ...validTask,
            creatorId: userId,
        });
        const result = await TaskService.createTask(userId, validTask);
        expect(TaskRepository.create).toHaveBeenCalledWith({
            ...validTask,
            dueDate: expect.any(Date),
            creatorId: userId,
        });
        expect(result.id).toBe("task-id");
    });
    // ❌ TEST 2: Due date validation
    it("throws error when due date is in the past", async () => {
        const invalidTask = {
            ...validTask,
            dueDate: new Date(Date.now() - 1000).toISOString(),
        };
        await expect(TaskService.createTask(userId, invalidTask)).rejects.toThrow("Due date cannot be in the past");
        expect(TaskRepository.create).not.toHaveBeenCalled();
    });
    // ❌ TEST 3: Repository failure bubbles up
    it("propagates repository errors", async () => {
        TaskRepository.create.mockRejectedValue(new Error("DB failure"));
        await expect(TaskService.createTask(userId, validTask)).rejects.toThrow("DB failure");
    });
});
//# sourceMappingURL=task.service.test.js.map