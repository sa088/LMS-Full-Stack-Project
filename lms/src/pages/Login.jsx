import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { loginSchema } from "../lib/validators";
import { useAuthStore } from "../stores/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const { accessToken, user } = response.data;
        setAuth(user, accessToken);
        navigate("/dashboard");
      },
    });
  };

  return (
    <div>
      <div className="mb-8 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            L
          </span>
          <span className="text-lg font-semibold text-slate-900">LearnHub</span>
        </Link>
      </div>

      <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
      <p className="mt-2 text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Sign up
        </Link>
      </p>

      {loginMutation.isError && (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loginMutation.error?.response?.data?.message ||
            "Login failed. Please try again."}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Forgot password?
            </span>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="remember" className="text-sm text-slate-600">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-slate-50 px-4 text-slate-500">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          GitHub
        </button>
      </div>
    </div>
  );
}
