import { useQuery } from "@tanstack/react-query";
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
    enabled: Boolean(id), // don't fetch until we actually have an id
  });
}
