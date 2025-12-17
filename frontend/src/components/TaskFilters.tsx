type Filters = {
  status?: string;
  priority?: string;
  sortByDueDate?: "asc" | "desc";
};

export default function TaskFilters({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Status
        </label>
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Priority
        </label>
        <select
          value={filters.priority ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">
          Sort by due date
        </label>
        <select
          value={filters.sortByDueDate ?? "asc"}
          onChange={(e) =>
            setFilters({
              ...filters,
              sortByDueDate: e.target.value as "asc" | "desc",
            })
          }
          className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>
      </div>

      {/* Clear filters */}
      <button
        onClick={() =>
          setFilters({ sortByDueDate: "asc" })
        }
        className="text-sm text-gray-500 hover:text-black sm:mb-1"
      >
        Clear
      </button>
    </div>
  );
}
