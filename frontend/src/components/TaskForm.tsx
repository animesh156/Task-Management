import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormData } from "../validation/task.schema";
import { createTask } from "../api/tasks.api";

export default function TaskForm({ onSuccess }: any) {
  const { register, handleSubmit, formState } =
    useForm<TaskFormData>({
      resolver: zodResolver(taskSchema),
    });

  const onSubmit = async (data: TaskFormData) => {
    await createTask(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register("title")} className="border p-2 w-full" />
      <textarea {...register("description")} className="border p-2 w-full" />
      <input type="datetime-local" {...register("dueDate")} className="border p-2 w-full" />

      <button className="bg-black text-white w-full py-2 rounded">
        Create Task
      </button>
    </form>
  );
}
