export default function TaskFilters({ filters, setFilters }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      <select
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="REVIEW">Review</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters({ ...filters, sortByDueDate: e.target.value })
        }
      >
        <option value="asc">Due Date ↑</option>
        <option value="desc">Due Date ↓</option>
      </select>
    </div>
  );
}
