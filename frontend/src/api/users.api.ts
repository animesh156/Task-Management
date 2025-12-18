import api from "../lib/axios";
import type { User } from "../types/user";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};
