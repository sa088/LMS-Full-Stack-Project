import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourses } from "../hooks/useCourses";
import { useAuthStore } from "../stores/authStore";

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: courses, isLoading } = useCourses();

  const stats = useMemo(() => {
    if (!courses) return null;
    const instructorIds = new Set(
      courses.map((c) => c.instructor?.id).filter(Boolean),
    );
    const categories = new Set(courses.map((c) => c.category).filter(Boolean));
    const totalLessons = courses.reduce(
      (sum, c) => sum + (c.lessons?.length ?? 0),
      0,
    );
    return {
      courses: courses.length,
      instructors: instructorIds.size,
      lessons: totalLessons,
      categories: categories.size,
    };
  }, [courses]);

  const featured = (courses ?? []).slice(0, 3);

  return (
    <div>
      <div className="bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">
              Welcome to LearnHub
            </p>
            <h1 className="mt-4 text-5xl font-bold text-white">
              Learn without limits
            </h1>
            <p className="mt-6 text-lg text-indigo-100">
              Start, switch, or advance your career with courses from expert
              instructors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Explore Courses
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {isLoading || !stats ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="mx-auto h-9 w-16" />
                  <Skeleton className="mx-auto mt-2 h-4 w-20" />
                </div>
              ))
            ) : (
              <>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.courses}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Courses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.lessons}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Lessons</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.instructors}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Instructors</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-600">
                    {stats.categories}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Categories</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Featured Courses
          </h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <Skeleton className="h-44 w-full rounded-none" />
                <div className="p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
                    <span className="text-4xl font-bold text-indigo-300">
                      {course.title[0]}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                    {course.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {course.description}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    By {course.instructor?.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
