import TaskForm from "../components/TaskForm";
import { useCreateTask } from "../hooks/useTasks";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const navigate = useNavigate();
  const createTask = useCreateTask();

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Create Task</h1>

      <TaskForm
        loading={createTask.isPending}
        onSubmit={async (data) => {
          await createTask.mutateAsync({
            ...data,
            dueDate: new Date(data.dueDate).toISOString(), 
          });
          navigate("/");
        }}
      />
    </div>
  );
}
