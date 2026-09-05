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

// Small helper: given a courseId, tells you if the current user is
// already enrolled. Built on top of useEnrollments so it shares the cache.
export function useIsEnrolled(courseId) {
  const { data: enrollments } = useEnrollments();
  return Boolean(enrollments?.some((e) => e.courseId === courseId));
}

// Instructor/admin only: list students enrolled in a specific course.
export function useCourseEnrollments(courseId) {
  return useQuery({
    queryKey: ["courses", courseId, "enrollments"],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${courseId}/enrollments`);
      return data;
    },
    enabled: Boolean(courseId),
  });
}
