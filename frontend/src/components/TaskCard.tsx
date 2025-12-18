import type { Task } from "../types/task";
import { useUpdateTask } from "../hooks/useTasks";

const statusStyles: Record<Task["status"], string> = {
  TODO: "bg-gray-800 text-gray-300 border border-gray-700",
  IN_PROGRESS: "bg-blue-900/40 text-blue-300 border border-blue-700",
  REVIEW: "bg-yellow-900/40 text-yellow-300 border border-yellow-700",
  COMPLETED: "bg-green-900/40 text-green-300 border border-green-700",
};

const priorityStyles: Record<Task["priority"], string> = {
  LOW: "text-gray-400",
  MEDIUM: "text-blue-400",
  HIGH: "text-orange-400",
  URGENT: "text-red-400",
};

export default function TaskCard({ task }: { task: Task }) {
  const updateTask = useUpdateTask();

  return (
    <div className="group bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-lg hover:border-slate-700 transition flex flex-col gap-3">
      
      {/* Title + Status */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-slate-100 line-clamp-1">
          {task.title}
        </h3>

        {/* STATUS EDIT (hover) */}
        <select
          value={task.status}
          onChange={(e) =>
            updateTask.mutate({
              id: task.id,
              data: { status: e.target.value },
            })
          }
          className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer
            bg-transparent outline-none
            ${statusStyles[task.status]}
            opacity-0 group-hover:opacity-100 transition`}
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* STATUS BADGE */}
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${statusStyles[task.status]}
            group-hover:hidden`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs mt-auto">
        {/* PRIORITY */}
        <select
          value={task.priority}
          onChange={(e) =>
            updateTask.mutate({
              id: task.id,
              data: { priority: e.target.value },
            })
          }
          className={`bg-transparent outline-none cursor-pointer font-medium
            ${priorityStyles[task.priority]}`}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <span className="text-slate-500">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
