import { useState } from "react";
import { useTasks, useOverdueTasks } from "../hooks/useTasks";
import TaskCard from "../components/TaskCard";
import TaskSkeleton from "../components/TaskSkeleton";
import TaskTabs from "../components/TaskTabs";
import TaskFilters from "../components/TaskFilters";

export default function Dashboard() {
  const [tab, setTab] = useState<"assigned" | "created" | "overdue">(
    "assigned"
  );

  const [filters, setFilters] = useState({});

  const { data, isLoading } = useTasks(filters);
  const { data: overdue } = useOverdueTasks();

  const tasks = tab === "overdue" ? overdue : data;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <TaskTabs tab={tab} setTab={setTab} />
      <TaskFilters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
          : tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
}
