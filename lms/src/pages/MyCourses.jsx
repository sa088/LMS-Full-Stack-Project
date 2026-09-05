import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useEnrollments, useUnenroll } from "../hooks/useEnrollments";

export default function MyCourses() {
  const { data: enrollments, isLoading, isError, refetch } = useEnrollments();
  const unenrollMutation = useUnenroll();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
          <p className="mt-1 text-slate-500">
            {isLoading
              ? "Loading…"
              : `${enrollments?.length ?? 0} courses enrolled`}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="mt-8 space-y-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-medium text-red-700">
            Couldn&apos;t load your courses.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && enrollments?.length === 0 && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-12 text-center">
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

      {!isLoading && !isError && enrollments?.length > 0 && (
        <div className="mt-8 space-y-4">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100 sm:h-24 sm:w-36">
                <span className="text-2xl font-bold text-indigo-300">
                  {enrollment.course?.title?.[0]}
                </span>
              </div>

              <div className="flex-1">
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
                >
                  {enrollment.course?.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  {enrollment.course?.instructor?.name}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {enrollment.course?.lessons?.length ?? 0} lessons · Enrolled{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  to={`/courses/${enrollment.courseId}`}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Continue
                </Link>
                <button
                  type="button"
                  disabled={unenrollMutation.isPending}
                  onClick={() => unenrollMutation.mutate(enrollment.courseId)}
                  className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
