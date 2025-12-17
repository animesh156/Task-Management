import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  taskSchema,
  type TaskFormData,
} from "../validation/task.schema";

type Props = {
  initialValues?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  loading?: boolean;
};

export default function TaskForm({
  initialValues,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "TODO",
      priority: "MEDIUM",
      ...initialValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded-lg border"
    >
      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          {...register("title")}
          className="w-full border p-2 rounded mt-1"
        />
        {errors.title && (
          <p className="text-xs text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="text-sm font-medium">Due date</label>
        <input
          type="date"
          {...register("dueDate")}
          className="w-full border p-2 rounded mt-1"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium">Priority</label>
        <select
          {...register("priority")}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          {...register("status")}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Assigned To */}
      <div>
        <label className="text-sm font-medium">Assign to (User ID)</label>
        <input
          {...register("assignedToId")}
          className="w-full border p-2 rounded mt-1"
        />
        {errors.assignedToId && (
          <p className="text-xs text-red-500">
            Invalid user ID
          </p>
        )}
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}
