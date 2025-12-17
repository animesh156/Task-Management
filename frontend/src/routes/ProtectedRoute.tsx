import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: any) {
  const { data, isLoading } = useMe();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <Navigate to="/login" />;

  return children;
}
