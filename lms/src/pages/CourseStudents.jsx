import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourseEnrollments } from "../hooks/useEnrollments";
import { useCourse } from "../hooks/useCourses";

export default function CourseStudents() {
  const { id: courseId } = useParams();
  const { data: course } = useCourse(courseId);
  const {
    data: enrollments,
    isLoading,
    isError,
  } = useCourseEnrollments(courseId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/instructor/dashboard"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        ← Back to dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        {course?.title}
      </h1>
      <p className="mt-1 text-slate-500">
        {isLoading
          ? "Loading…"
          : `${enrollments?.length ?? 0} students enrolled`}
      </p>

      {isLoading && (
        <div className="mt-6 space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
          Couldn&apos;t load enrollments for this course.
        </div>
      )}

      {!isLoading && !isError && enrollments?.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500">
          No students have enrolled yet.
        </div>
      )}

      {!isLoading && !isError && enrollments?.length > 0 && (
        <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="flex items-center gap-4 px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                {enrollment.student?.name?.[0] ?? "?"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {enrollment.student?.name}
                </p>
                <p className="text-sm text-slate-500">
                  {enrollment.student?.email}
                </p>
              </div>
              <p className="shrink-0 text-xs text-slate-400">
                Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
