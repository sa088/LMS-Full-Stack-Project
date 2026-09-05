import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourses, useDeleteCourse } from "../hooks/useCourses";
import { useAuthStore } from "../stores/authStore";

export default function InstructorDashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: courses, isLoading } = useCourses();
  const deleteMutation = useDeleteCourse();

  // Admins manage every course; instructors only see their own.
  const myCourses = (courses ?? []).filter(
    (c) => user?.role === "admin" || c.instructorId === user?.id,
  );

  const handleDelete = (course) => {
    if (window.confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(course.id);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {user?.role === "admin" ? "All Courses" : "My Courses"}
          </h1>
          <p className="mt-1 text-slate-500">
            Create and manage your course content.
          </p>
        </div>
        <Link
          to="/instructor/courses/new"
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Create Course
        </Link>
      </div>

      {isLoading && (
        <div className="mt-8 space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {!isLoading && myCourses.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">
            You haven&apos;t created any courses yet.
          </p>
          <Link
            to="/instructor/courses/new"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Create your first course
          </Link>
        </div>
      )}

      {!isLoading && myCourses.length > 0 && (
        <div className="mt-8 space-y-4">
          {myCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  to={`/courses/${course.id}`}
                  className="font-semibold text-slate-900 hover:text-indigo-600"
                >
                  {course.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  {course.lessons?.length ?? 0} lessons
                  {course.category ? ` · ${course.category}` : ""}
                  {user?.role === "admin"
                    ? ` · by ${course.instructor?.name}`
                    : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/instructor/courses/${course.id}/lessons`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Manage Lessons
                </Link>
                <Link
                  to={`/instructor/courses/${course.id}/students`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  View Students
                </Link>
                <Link
                  to={`/instructor/courses/${course.id}/edit`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(course)}
                  className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
