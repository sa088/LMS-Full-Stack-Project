import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useEnrollments } from "../hooks/useEnrollments";
import { useAuthStore } from "../stores/authStore";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: enrollments, isLoading } = useEnrollments();

  const stats = useMemo(() => {
    if (!enrollments) return { courses: 0, lessons: 0 };
    return {
      courses: enrollments.length,
      lessons: enrollments.reduce(
        (sum, e) => sum + (e.course?.lessons?.length ?? 0),
        0,
      ),
    };
  }, [enrollments]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name?.split(" ")[0]}
          </h1>
          <p className="mt-1 text-slate-500">
            Here&apos;s your learning overview.
          </p>
        </div>
        <Link
          to="/courses"
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Browse Courses
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Enrolled Courses</p>
          {isLoading ? (
            <Skeleton className="mt-2 h-8 w-12" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.courses}
            </p>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Lessons</p>
          {isLoading ? (
            <Skeleton className="mt-2 h-8 w-12" />
          ) : (
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {stats.lessons}
            </p>
          )}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Continue learning</h2>

        {isLoading && (
          <div className="mt-4 space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {!isLoading && enrollments?.length === 0 && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-500">
              You haven&apos;t enrolled in any courses yet.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Browse Courses
            </Link>
          </div>
        )}

        {!isLoading && enrollments?.length > 0 && (
          <div className="mt-4 space-y-4">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {enrollment.course?.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {enrollment.course?.lessons?.length ?? 0} lessons · Enrolled{" "}
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Continue →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
