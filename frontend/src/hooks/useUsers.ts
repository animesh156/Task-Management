import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users.api";
import type { User } from "../types/user";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
