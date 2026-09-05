import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import {
  useCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../hooks/useCourses";
import { courseSchema } from "../lib/validators";

export default function CourseEditor() {
  const { id } = useParams(); // undefined => create mode, present => edit mode
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const { data: course, isLoading: isLoadingCourse } = useCourse(
    isEditMode ? id : undefined,
  );
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse(id);
  const mutation = isEditMode ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      level: "",
    },
  });

  useEffect(() => {
    if (course) {
      reset({
        title: course.title,
        description: course.description,
        imageUrl: course.imageUrl ?? "",
        category: course.category ?? "",
        level: course.level ?? "",
      });
    }
  }, [course, reset]);

  const onSubmit = (data) => {
    mutation.mutate(data, {
      onSuccess: (response) => {
        const courseId = isEditMode ? id : response.data.id;
        navigate(`/instructor/courses/${courseId}/lessons`);
      },
    });
  };

  if (isEditMode && isLoadingCourse) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/instructor/dashboard"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        ← Back to dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        {isEditMode ? "Edit Course" : "Create a New Course"}
      </h1>

      {mutation.isError && (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {mutation.error?.response?.data?.message?.toString() ||
            "Something went wrong. Please try again."}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Course title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-700"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              placeholder="e.g. Development"
              {...register("category")}
              className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-slate-700"
            >
              Level
            </label>
            <select
              id="level"
              {...register("level")}
              className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">Select a level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-slate-700"
          >
            Thumbnail image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            placeholder="https://..."
            {...register("imageUrl")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.imageUrl && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.imageUrl.message}
            </p>
          )}
          <p className="mt-1.5 text-xs text-slate-500">
            Leave blank to use a placeholder image.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/instructor/dashboard"
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending
              ? "Saving…"
              : isEditMode
                ? "Save Changes"
                : "Create Course & Add Lessons"}
          </button>
        </div>
      </form>
    </div>
  );
}
