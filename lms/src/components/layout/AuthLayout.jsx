import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-indigo-600 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-sm font-bold">
            L
          </span>
          <span className="text-xl font-semibold">LearnHub</span>
        </Link>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Unlock your potential with world-class learning
          </h1>
          <p className="mt-4 max-w-md text-lg text-indigo-100">
            Join thousands of learners mastering new skills every day.
          </p>
        </div>

        <p className="text-sm text-indigo-200">
          © 2026 LearnHub. All rights reserved.
        </p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
