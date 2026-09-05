import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";
import { signupSchema } from "../lib/validators";
import { useAuthStore } from "../stores/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = ({ firstName, lastName, email, password }) => {
    const name = `${firstName} ${lastName}`.trim();

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: (response) => {
          const { accessToken, user } = response.data;
          setAuth(user, accessToken);
          navigate("/dashboard");
        },
      },
    );
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

      <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
      <p className="mt-2 text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Log in
        </Link>
      </p>

      {registerMutation.isError && (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {registerMutation.error?.response?.data?.message ||
            "Signup failed. Please try again."}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-700"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              {...register("firstName")}
              className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.firstName && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-700"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.lastName && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.password ? (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.password.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-slate-500">
              Must be at least 6 characters
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              {...register("terms")}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="terms" className="text-sm text-slate-600">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {errors.terms && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.terms.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {registerMutation.isPending ? "Creating account…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
