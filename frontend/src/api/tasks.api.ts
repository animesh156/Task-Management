import api from "../lib/axios"
import type { Task } from "../types/task";

export const fetchTasks = async (params?: unknown): Promise<Task[]> => {
  const res = await api.get("/api/tasks", { params });
  return res.data;
};

export const fetchOverdueTasks = async (): Promise<Task[]> => {
  const res = await api.get("/api/tasks/overdue");
  return res.data;
};