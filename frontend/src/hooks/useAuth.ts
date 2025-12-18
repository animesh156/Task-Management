import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/auth.api";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      toast.success("Logged in successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Account created successfully 🎉");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success("Logged out successfully 👋");
      queryClient.removeQueries({ queryKey: ["me"] });
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
};
