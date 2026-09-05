import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { useCourse } from "../hooks/useCourses";
import {
  useCreateLesson,
  useDeleteLesson,
  useUpdateLesson,
} from "../hooks/useLessons";
import { lessonSchema } from "../lib/validators";

function LessonForm({ courseId, lesson, onDone }) {
  const isEditMode = Boolean(lesson);
  const createMutation = useCreateLesson(courseId);
  const updateMutation = useUpdateLesson(courseId);
  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: lesson?.title ?? "",
      content: lesson?.content ?? "",
      durationMinutes: lesson?.durationMinutes ?? "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      durationMinutes:
        data.durationMinutes === "" ? undefined : Number(data.durationMinutes),
    };

    if (isEditMode) {
      updateMutation.mutate(
        { lessonId: lesson.id, data: payload },
        { onSuccess: () => onDone?.() },
      );
    } else {
      createMutation.mutate(payload, { onSuccess: () => onDone?.() });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Lesson title
        </label>
        <input
          type="text"
          {...register("title")}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Content
        </label>
        <textarea
          rows={3}
          {...register("content")}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="max-w-40">
        <label className="block text-sm font-medium text-slate-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          min="1"
          {...register("durationMinutes")}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="flex justify-end gap-2">
        {isEditMode && (
          <button
            type="button"
            onClick={onDone}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending
            ? "Saving…"
            : isEditMode
              ? "Save Lesson"
              : "Add Lesson"}
        </button>
      </div>
    </form>
  );
}

export default function ManageLessons() {
  const { id: courseId } = useParams();
  const { data: course, isLoading } = useCourse(courseId);
  const deleteMutation = useDeleteLesson(courseId);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );
  }

  const lessons = [...(course?.lessons ?? [])].sort(
    (a, b) => a.order - b.order,
  );

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
      <p className="mt-1 text-slate-500">Manage lessons for this course.</p>

      <div className="mt-8 space-y-3">
        {lessons.map((lesson, index) =>
          editingLessonId === lesson.id ? (
            <LessonForm
              key={lesson.id}
              courseId={courseId}
              lesson={lesson}
              onDone={() => setEditingLessonId(null)}
            />
          ) : (
            <div
              key={lesson.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                    {lesson.content}
                  </p>
                  {lesson.durationMinutes && (
                    <p className="mt-1 text-xs text-slate-400">
                      {lesson.durationMinutes} min
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLessonId(lesson.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(lesson.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ),
        )}

        {lessons.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No lessons yet. Add your first one below.
          </p>
        )}
      </div>

      <div className="mt-6">
        {showAddForm ? (
          <LessonForm
            courseId={courseId}
            onDone={() => setShowAddForm(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
          >
            + Add a lesson
          </button>
        )}
      </div>
    </div>
  );
}
