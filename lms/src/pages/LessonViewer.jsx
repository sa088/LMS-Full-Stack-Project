import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useIsEnrolled } from "../hooks/useEnrollments";
import { useCourse } from "../hooks/useCourses";

export default function LessonViewer() {
  const { id: courseId, lessonId } = useParams();
  const { data: course, isLoading } = useCourse(courseId);
  const isEnrolled = useIsEnrolled(courseId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="mt-4 h-8 w-2/3" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  const lessons = [...(course?.lessons ?? [])].sort(
    (a, b) => a.order - b.order,
  );
  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const lesson = lessons[currentIndex];

  if (!course || !lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Lesson not found</h1>
        <Link
          to={`/courses/${courseId}`}
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to course
        </Link>
      </div>
    );
  }

  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to={`/courses/${courseId}`}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        ← Back to {course.title}
      </Link>

      {!isEnrolled && (
        <div className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          You&apos;re previewing this lesson. Enroll in the course to track your
          progress.
        </div>
      )}

      <p className="mt-6 text-sm font-medium text-indigo-600">
        Lesson {currentIndex + 1} of {lessons.length}
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900">{lesson.title}</h1>
      {lesson.durationMinutes && (
        <p className="mt-2 text-sm text-slate-500">
          {lesson.durationMinutes} min
        </p>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 leading-relaxed text-slate-700 shadow-sm">
        {lesson.content}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {prevLesson ? (
          <Link
            to={`/courses/${courseId}/lessons/${prevLesson.id}`}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            ← {prevLesson.title}
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link
            to={`/courses/${courseId}/lessons/${nextLesson.id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            {nextLesson.title} →
          </Link>
        ) : (
          <Link
            to={`/courses/${courseId}`}
            className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Finish course ✓
          </Link>
        )}
      </div>
    </div>
  );
}
