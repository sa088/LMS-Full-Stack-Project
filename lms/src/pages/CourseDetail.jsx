import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { useEnroll, useIsEnrolled, useUnenroll } from "../hooks/useEnrollments";
import { useCourse } from "../hooks/useCourses";
import { useAuthStore } from "../stores/authStore";

const levelVariant = {
  beginner: "green",
  intermediate: "indigo",
  advanced: "red",
};

function CourseDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="mt-4 h-10 w-2/3" />
      <Skeleton className="mt-6 h-40 w-full" />
    </div>
  );
}

function EnrollButton({ courseId }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isEnrolled = useIsEnrolled(courseId);
  const enrollMutation = useEnroll();
  const unenrollMutation = useUnenroll();

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Log in to enroll
      </button>
    );
  }

  if (user?.role !== "student") {
    return (
      <div className="mt-4 rounded-lg bg-slate-100 px-4 py-3 text-center text-sm text-slate-500">
        Only students can enroll in courses
      </div>
    );
  }

  if (isEnrolled) {
    return (
      <button
        type="button"
        disabled={unenrollMutation.isPending}
        onClick={() => unenrollMutation.mutate(courseId)}
        className="mt-4 w-full rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {unenrollMutation.isPending ? "Unenrolling…" : "Unenroll"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={enrollMutation.isPending}
      onClick={() => enrollMutation.mutate(courseId)}
      className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {enrollMutation.isPending ? "Enrolling…" : "Enroll Now"}
    </button>
  );
}

export default function CourseDetail() {
  const { id } = useParams();
  const { data: course, isLoading, isError } = useCourse(id);
  const user = useAuthStore((state) => state.user);

  if (isLoading) return <CourseDetailSkeleton />;

  if (isError || !course) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Course not found</h1>
        <p className="mt-2 text-slate-500">
          This course doesn&apos;t exist or may have been removed.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  const lessons = [...(course.lessons ?? [])].sort((a, b) => a.order - b.order);
  const canManage = user?.role === "admin" || course.instructorId === user?.id;

  return (
    <div>
      <div className="bg-linear-to-br from-indigo-600 to-purple-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              to="/courses"
              className="text-sm font-medium text-indigo-200 hover:text-white"
            >
              ← Back to courses
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {course.category && (
                <Badge variant="indigo">{course.category}</Badge>
              )}
              {course.level && (
                <Badge variant={levelVariant[course.level]}>
                  {course.level}
                </Badge>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-lg text-indigo-100">{course.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-indigo-200">
              <span>By {course.instructor?.name}</span>
              <span>{lessons.length} lessons</span>
            </div>
            {canManage && (
              <Link
                to={`/instructor/courses/${course.id}/lessons`}
                className="mt-4 inline-block rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
              >
                Manage this course →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Course content
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {lessons.length} lessons
              </p>

              {lessons.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No lessons have been added to this course yet.
                </p>
              ) : (
                <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                  {lessons.map((lesson, index) => (
                    <Link
                      key={lesson.id}
                      to={`/courses/${course.id}/lessons/${lesson.id}`}
                      className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-sm font-medium text-slate-900">
                        {lesson.title}
                      </p>
                      {lesson.durationMinutes && (
                        <span className="shrink-0 text-xs text-slate-400">
                          {lesson.durationMinutes} min
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">
                About the instructor
              </h2>
              <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                  {course.instructor?.name?.[0] ?? "?"}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {course.instructor?.name}
                  </h3>
                  <p className="text-sm text-indigo-600">
                    {course.instructor?.email}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-40 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg bg-linear-to-br from-indigo-100 to-purple-100">
                  <span className="text-5xl font-bold text-indigo-300">
                    {course.title[0]}
                  </span>
                </div>
              )}

              <EnrollButton courseId={course.id} />

              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span>📚</span> {lessons.length} lessons
                </li>
                <li className="flex items-center gap-2">
                  <span>♾️</span> Lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
