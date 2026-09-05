import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourses } from "../hooks/useCourses";

const levelVariant = {
  beginner: "green",
  intermediate: "indigo",
  advanced: "red",
};

function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="mt-3 h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function Courses() {
  const { data: courses, isLoading, isError, refetch } = useCourses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const categories = useMemo(
    () => [...new Set((courses ?? []).map((c) => c.category).filter(Boolean))],
    [courses],
  );

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = search.toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q);
      const matchesCategory =
        category === "all" || course.category === category;
      const matchesLevel = level === "all" || course.level === level;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, search, category, level]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">All Courses</h1>
        <p className="mt-2 text-slate-500">
          Explore our catalog of expert-led courses across every discipline.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {isLoading && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-medium text-red-700">
            Couldn&apos;t load courses.
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

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">No courses match your search.</p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
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
                <div className="flex flex-wrap items-center gap-2">
                  {course.category && (
                    <Badge variant="indigo">{course.category}</Badge>
                  )}
                  {course.level && (
                    <Badge variant={levelVariant[course.level]}>
                      {course.level}
                    </Badge>
                  )}
                  <Badge>{course.lessons?.length ?? 0} lessons</Badge>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                  {course.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {course.description}
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  By {course.instructor?.name ?? "Unknown instructor"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
