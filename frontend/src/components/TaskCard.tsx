import type { Task } from "../types/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border rounded p-4 shadow">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="text-sm mt-2 flex gap-4">
        <span>{task.status}</span>
        <span>{task.priority}</span>
        <span>
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
