import { updateTask } from './../api/tasks.api';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  fetchOverdueTasks,
  createTask,
} from "../api/tasks.api";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

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
      toast.success("Task created successfully")
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
     onError: (error: AxiosError<any>) => {
          toast.error(
            error.response?.data?.message || "Error creating task"
          );
        },
  });
};



export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTask(id, data),

    onSuccess: () => {
      // fallback safety (socket already handles this)
      toast.success("Task updated successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
     onError: (error: AxiosError<any>) => {
          toast.error(
            error.response?.data?.message || "Error updating task"
          );
        },
  });
}