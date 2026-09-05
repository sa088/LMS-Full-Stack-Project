import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

// Lessons are always managed in the context of one course, so every
// mutation here invalidates that course's cache entry (which embeds
// its lessons) plus the course list (lesson counts shown on cards).
export function useCreateLesson(courseId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post(`/courses/${courseId}/lessons`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateLesson(courseId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, data }) => api.patch(`/lessons/${lessonId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useDeleteLesson(courseId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId) => api.delete(`/lessons/${lessonId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
