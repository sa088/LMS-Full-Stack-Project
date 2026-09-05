import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourses } from "../hooks/useCourses";

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
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    if (!courses) return [];

    const bySearch = courses.filter((course) => {
      const q = search.toLowerCase();
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)
      );
    });

    return [...bySearch].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "lessons")
        return (b.lessons?.length ?? 0) - (a.lessons?.length ?? 0);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });
  }, [courses, search, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">All Courses</h1>
        <p className="mt-2 text-slate-500">
          Explore our catalog of expert-led courses across every discipline.
        </p>
      </div>

      {/* Filters */}
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
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="newest">Newest</option>
          <option value="title">Title A–Z</option>
          <option value="lessons">Most lessons</option>
        </select>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
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

      {/* Empty state */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-slate-500">No courses match your search.</p>
        </div>
      )}

      {/* Course Grid */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="flex h-44 items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
                <span className="text-4xl font-bold text-indigo-300">
                  {course.title[0]}
                </span>
              </div>
              <div className="p-5">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {course.lessons?.length ?? 0} lessons
                </span>
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
