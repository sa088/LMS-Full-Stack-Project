import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { profileSchema } from "../lib/validators";
import { useAuthStore } from "../stores/authStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      bio: "",
    },
  });

  const onSubmit = (data) => {
    updateUser(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    reset(data);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
      <p className="mt-1 text-slate-500">Manage your account information.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Profile Photo
          </h2>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
              {user?.name?.[0] ?? "?"}
            </div>
            <p className="text-sm text-slate-500">
              Signed in as{" "}
              <span className="font-medium text-slate-700">{user?.role}</span>
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h2>

          {saved && (
            <p className="mt-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
              Profile saved!
            </p>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-slate-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                {...register("bio")}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.bio && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isDirty}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
