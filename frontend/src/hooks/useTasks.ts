import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchOverdueTasks } from "../api/tasks.api";

export const useTasks = (params: {
  view?: "assigned" | "created";
  status?: string;
  priority?: string;
  sortByDueDate?: "asc" | "desc";
}) =>
  useQuery({
    queryKey: ["tasks", params],
    queryFn: () => fetchTasks(params),
  });


export const useOverdueTasks = () =>
  useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: fetchOverdueTasks,
  });
