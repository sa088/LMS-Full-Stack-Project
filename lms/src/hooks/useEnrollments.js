import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useEnrollments() {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data } = await api.get("/me/enrollments");
      return data;
    },
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => api.post(`/courses/${courseId}/enroll`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUnenroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => api.delete(`/courses/${courseId}/enroll`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

// Given a courseId, tells you if the current user is already enrolled.
export function useIsEnrolled(courseId) {
  const { data: enrollments } = useEnrollments();
  return Boolean(enrollments?.some((e) => e.courseId === courseId));
}
