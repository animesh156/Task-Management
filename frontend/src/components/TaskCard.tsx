import type { Task } from "../types/task";

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
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* Title + Status */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {task.title}
        </h3>

        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs">
        <span
          className={`font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>

        <span className="text-gray-500">
          Due{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
