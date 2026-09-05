import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get("/courses");
      return data;
    },
  });
}

export function useCourse(id) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
}

// Strips empty-string optional fields before sending, so the backend's
// @IsUrl()/@IsEnum() validators don't choke on ''.
function cleanCoursePayload(data) {
  const payload = { ...data };
  if (!payload.imageUrl) delete payload.imageUrl;
  if (!payload.category) delete payload.category;
  if (!payload.level) delete payload.level;
  return payload;
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/courses", cleanCoursePayload(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.patch(`/courses/${id}`, cleanCoursePayload(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses", id] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
