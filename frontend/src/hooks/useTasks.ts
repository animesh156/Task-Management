import { useQuery } from "@tanstack/react-query";
import { fetchTasks, fetchOverdueTasks } from "../api/tasks.api";

type TaskQueryParams = {
  view?: "assigned" | "created";
  status?: string;
  priority?: string;
  sortByDueDate?: "asc" | "desc";
};

const cleanParams = (params: TaskQueryParams) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== undefined
    )
  ) as TaskQueryParams;

export const useTasks = (params: TaskQueryParams) =>
  useQuery({
    queryKey: ["tasks", params],
    queryFn: () => fetchTasks(cleanParams(params)),
  });

export const useOverdueTasks = () =>
  useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: fetchOverdueTasks,
  });
