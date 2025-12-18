import { useState, useEffect } from "react";
import { useTasks, useOverdueTasks } from "../hooks/useTasks";
import { useLogout } from "../hooks/useAuth";
import TaskCard from "../components/TaskCard";
import TaskSkeleton from "../components/TaskSkeleton";
import TaskTabs from "../components/TaskTabs";
import TaskFilters from "../components/TaskFilters";
import { Link } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";


export default function Dashboard() {
  const logout = useLogout();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("task:updated", () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:updated");
    };
  }, []);

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
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-100">
            Dashboard
          </h1>

          <div className="flex gap-3 items-center">
            <Link
              to="/tasks/create"
              className="bg-slate-800 text-slate-100 px-4 py-2 rounded-md text-sm
                         hover:bg-slate-700 transition border border-slate-700"
            >
              + Create Task
            </Link>

            <button
              onClick={async () => {
                await logout.mutateAsync();
                window.location.href = "/login";
              }}
              className="text-sm cursor-pointer text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <TaskTabs tab={tab} setTab={setTab} />

        {/* Filters */}
        {tab !== "overdue" && (
          <div className="mt-4">
            <TaskFilters filters={filters} setFilters={setFilters} />
          </div>
        )}

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TaskSkeleton key={i} />
              ))
            : tasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
        </div>
      </div>
    </div>
  );
}
