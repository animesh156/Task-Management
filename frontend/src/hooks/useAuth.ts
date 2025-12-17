import { useQuery, useMutation } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/auth.api";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });
