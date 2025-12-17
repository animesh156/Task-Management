import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchOverdueTasks } from "../api/tasks.api";

export const useTasks = (filters: any) =>
  useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
  });

export const useOverdueTasks = () =>
  useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: fetchOverdueTasks,
  });
