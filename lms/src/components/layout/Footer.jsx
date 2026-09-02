import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                L
              </span>
              <span className="text-lg font-semibold text-slate-900">LearnHub</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Learn new skills online with expert-led courses and interactive lessons.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/courses" className="text-sm text-slate-500 hover:text-indigo-600">Browse Courses</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-500 hover:text-indigo-600">Dashboard</Link></li>
              <li><Link to="/my-courses" className="text-sm text-slate-500 hover:text-indigo-600">My Courses</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Account</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/login" className="text-sm text-slate-500 hover:text-indigo-600">Log in</Link></li>
              <li><Link to="/signup" className="text-sm text-slate-500 hover:text-indigo-600">Sign up</Link></li>
              <li><Link to="/profile" className="text-sm text-slate-500 hover:text-indigo-600">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><span className="text-sm text-slate-500">Help Center</span></li>
              <li><span className="text-sm text-slate-500">Contact Us</span></li>
              <li><span className="text-sm text-slate-500">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © 2026 LearnHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
