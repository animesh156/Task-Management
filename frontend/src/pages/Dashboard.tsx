import { useState } from "react";
import { useTasks, useOverdueTasks } from "../hooks/useTasks";
import { useLogout } from "../hooks/useAuth";
import TaskCard from "../components/TaskCard";
import TaskSkeleton from "../components/TaskSkeleton";
import TaskTabs from "../components/TaskTabs";
import TaskFilters from "../components/TaskFilters";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const logout = useLogout();

  const [tab, setTab] = useState<"assigned" | "created" | "overdue">(
    "assigned"
  );

  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
    sortByDueDate?: "asc" | "desc";
  }>({
    sortByDueDate: "asc",
  });

  const { data, isLoading } = useTasks({
    ...filters,
    view: tab === "overdue" ? undefined : tab,
  });

  const { data: overdue, isLoading: overdueLoading } =
    useOverdueTasks();

  const tasks = tab === "overdue" ? overdue : data;
  const loading = tab === "overdue" ? overdueLoading : isLoading;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>

       <div className="flex gap-3 items-center">
  <Link
    to="/tasks/create"
    className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
  >
    + Create Task
  </Link>

  <button
    onClick={async () => {
      await logout.mutateAsync();
      window.location.href = "/login";
    }}
    className="text-sm text-red-600 hover:underline"
  >
    Logout
  </button>
</div>

      </div>

      <TaskTabs tab={tab} setTab={setTab} />

      {tab !== "overdue" && (
        <TaskFilters filters={filters} setFilters={setFilters} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <TaskSkeleton key={i} />
            ))
          : tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
      </div>
    </div>
  );
}
