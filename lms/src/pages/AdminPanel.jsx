import { Link } from "react-router-dom";
import { Skeleton } from "../components/ui/Skeleton";
import { Badge } from "../components/ui/Badge";
import { useUpdateUserRole, useUsers } from "../hooks/useUsers";
import { useAuthStore } from "../stores/authStore";

const roleBadgeVariant = {
  admin: "red",
  instructor: "indigo",
  student: "default",
};

export default function AdminPanel() {
  const currentUser = useAuthStore((state) => state.user);
  const { data: users, isLoading, isError } = useUsers();
  const updateRoleMutation = useUpdateUserRole();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-slate-500">Manage user accounts and roles.</p>
        </div>
        <Link
          to="/instructor/dashboard"
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Manage Courses →
        </Link>
      </div>

      {isLoading && (
        <div className="mt-8 space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      )}

      {isError && !isLoading && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
          Couldn&apos;t load users.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Change role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {user.name}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{user.email}</td>
                  <td className="px-5 py-3">
                    <Badge variant={roleBadgeVariant[user.role]}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={user.role}
                      disabled={
                        user.id === currentUser?.id ||
                        updateRoleMutation.isPending
                      }
                      onChange={(e) =>
                        updateRoleMutation.mutate({
                          userId: user.id,
                          role: e.target.value,
                        })
                      }
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
