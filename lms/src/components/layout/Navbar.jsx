import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            L
          </span>
          <span className="text-lg font-semibold text-slate-900">LearnHub</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Courses
          </Link>

          {isAuthenticated && user?.role === "student" && (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <Link
                to="/my-courses"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                My Courses
              </Link>
            </>
          )}

          {isAuthenticated &&
            (user?.role === "instructor" || user?.role === "admin") && (
              <Link
                to="/instructor/dashboard"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                {user.role === "admin"
                  ? "Manage Courses"
                  : "Instructor Dashboard"}
              </Link>
            )}

          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Admin Panel
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hidden text-sm font-medium text-slate-700 hover:text-indigo-600 sm:inline-flex"
              >
                Welcome, {user?.name?.split(" ")[0]}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
