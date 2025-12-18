import api from "../lib/axios";
import type { Task } from "../types/task";

export const fetchTasks = async (params?: any): Promise<Task[]> => {
  const res = await api.get("/tasks", { params });
  return res.data;
};

export const fetchOverdueTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (data: any) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id: string, data: any) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};