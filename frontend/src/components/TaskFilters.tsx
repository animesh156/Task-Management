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
    <div className="flex flex-wrap items-end gap-3
                    bg-[#0f172a] border border-slate-800
                    rounded-xl px-4 py-3">
      
      {/* Status */}
      <div className="flex flex-col gap-1 w-40">
        <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          Status
        </label>
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="h-9 bg-[#020617] border border-slate-700 rounded-md px-3 text-sm
                     text-slate-200 outline-none
                     focus:ring-2 focus:ring-slate-600"
        >
          <option value="">All</option>
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col gap-1 w-40">
        <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          Priority
        </label>
        <select
          value={filters.priority ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
          className="h-9 bg-[#020617] border border-slate-700 rounded-md px-3 text-sm
                     text-slate-200 outline-none
                     focus:ring-2 focus:ring-slate-600"
        >
          <option value="">All</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-1 w-50">
        <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
          Due Date
        </label>
        <select
          value={filters.sortByDueDate ?? "asc"}
          onChange={(e) =>
            setFilters({
              ...filters,
              sortByDueDate: e.target.value as "asc" | "desc",
            })
          }
          className="h-9 bg-[#020617] border border-slate-700 rounded-md px-3 text-sm
                     text-slate-200 outline-none
                     focus:ring-2 focus:ring-slate-600"
        >
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={() => setFilters({ sortByDueDate: "asc" })}
        className="h-9 px-3 text-sm rounded-md
                   border border-slate-700
                   text-slate-400 hover:text-slate-200
                   hover:bg-slate-800 transition"
      >
        Clear
      </button>
    </div>
  );
}
