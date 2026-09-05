import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export function useLogin() {
  return useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data) => api.post("/auth/register", data),
  });
}
