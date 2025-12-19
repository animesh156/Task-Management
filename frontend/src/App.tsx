import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateTask from "./pages/CreateTask";
import { SocketProvider } from "./context/SocketProvider";
import { useNotifications } from "./hooks/useNotifications";
import { Toaster } from "react-hot-toast";

export default function App() {
  useNotifications();

  return (
    <SocketProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks/create" element={<CreateTask />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}
