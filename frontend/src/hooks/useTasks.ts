import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  fetchOverdueTasks,
  createTask,
} from "../api/tasks.api";

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

/* -------------------- Queries -------------------- */

export const useTasks = (params: TaskQueryParams) => {
  const cleaned = cleanParams(params);

  return useQuery({
    queryKey: ["tasks", cleaned],
    queryFn: () => fetchTasks(cleaned),
  });
};

export const useOverdueTasks = () =>
  useQuery({
    queryKey: ["tasks", "overdue"],
    queryFn: fetchOverdueTasks,
  });

/* -------------------- Mutation -------------------- */

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // 🔄 refresh all task lists
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
