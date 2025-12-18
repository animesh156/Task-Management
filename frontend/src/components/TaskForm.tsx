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
      className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 space-y-5 max-w-2xl"
    >
      {/* Title */}
      <div>
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Title
        </label>
        <input
          {...register("title")}
          className="mt-1 h-10 w-full rounded-md bg-[#020617] border border-slate-700
                     px-3 text-sm text-slate-200 outline-none
                     focus:ring-2 focus:ring-slate-600"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-400">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1 w-full rounded-md bg-[#020617] border border-slate-700
                     px-3 py-2 text-sm text-slate-200 outline-none
                     focus:ring-2 focus:ring-slate-600 resize-none"
        />
      </div>

      {/* Grid: Due Date + Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Due Date
          </label>
          <input
            type="date"
            {...register("dueDate")}
            className="mt-1 h-10 w-full rounded-md bg-[#020617] border border-slate-700
                       px-3 text-sm text-slate-200 outline-none
                       focus:ring-2 focus:ring-slate-600"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Priority
          </label>
          <select
            {...register("priority")}
            className="mt-1 h-10 w-full rounded-md bg-[#020617] border border-slate-700
                       px-3 text-sm text-slate-200 outline-none
                       focus:ring-2 focus:ring-slate-600"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      {/* Grid: Status + Assigned */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Status
          </label>
          <select
            {...register("status")}
            className="mt-1 h-10 w-full rounded-md bg-[#020617] border border-slate-700
                       px-3 text-sm text-slate-200 outline-none
                       focus:ring-2 focus:ring-slate-600"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Assign To (User ID)
          </label>
          <input
            {...register("assignedToId")}
            className="mt-1 h-10 w-full rounded-md bg-[#020617] border border-slate-700
                       px-3 text-sm text-slate-200 outline-none
                       focus:ring-2 focus:ring-slate-600"
          />
          {errors.assignedToId && (
            <p className="mt-1 text-xs text-red-400">
              Invalid user ID
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex justify-end">
        <button
          disabled={loading}
          className="h-10 px-5 cursor-pointer rounded-md bg-slate-800 text-slate-100 text-sm font-medium
                     hover:bg-slate-700 transition
                     disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Task"}
        </button>
      </div>
    </form>
  );
}
