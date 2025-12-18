import type { Task } from "../types/task";
import { useUpdateTask } from "../hooks/useTasks";

const statusStyles: Record<Task["status"], string> = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  REVIEW: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const priorityStyles: Record<Task["priority"], string> = {
  LOW: "text-gray-500",
  MEDIUM: "text-blue-600",
  HIGH: "text-orange-600",
  URGENT: "text-red-600",
};

export default function TaskCard({ task }: { task: Task }) {
  const updateTask = useUpdateTask();

  return (
    <div className="group bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col gap-3">
      {/* Title + Status */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {task.title}
        </h3>

        {/* STATUS BADGE / EDIT */}
        <select
          value={task.status}
          onChange={(e) =>
            updateTask.mutate({
              id: task.id,
              data: { status: e.target.value },
            })
          }
          className={`text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer
            ${statusStyles[task.status]}
            opacity-0 group-hover:opacity-100 transition`}
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* static badge when not hovering */}
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium
            ${statusStyles[task.status]}
            group-hover:hidden`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">
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
          className={`font-medium cursor-pointer bg-transparent
            ${priorityStyles[task.priority]}`}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <span className="text-gray-500">
          Due {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
