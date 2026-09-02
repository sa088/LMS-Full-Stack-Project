import { Link } from 'react-router-dom'

const stats = [
  { label: 'Courses Enrolled', value: '5', change: '+1 this month' },
  { label: 'Hours Learned', value: '32', change: '+8 this week' },
  { label: 'Certificates', value: '2', change: '1 in progress' },
  { label: 'Current Streak', value: '7 days', change: 'Keep it up!' },
]

const recentActivity = [
  { course: 'React Fundamentals', lesson: 'Hooks Deep Dive', progress: 65 },
  { course: 'UI/UX Design Masterclass', lesson: 'Color Theory', progress: 40 },
  { course: 'Data Science with Python', lesson: 'Pandas Basics', progress: 20 },
]

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">Welcome back! Here&apos;s your learning overview.</p>
        </div>
        <Link
          to="/courses"
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Browse Courses
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-xs text-indigo-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">Continue learning</h2>
          <div className="mt-4 space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.course}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.course}</h3>
                    <p className="mt-1 text-sm text-slate-500">Next: {item.lesson}</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {item.progress}%
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Continue →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upcoming</h2>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <span className="text-xs font-bold leading-none">15</span>
                  <span className="text-[10px] leading-none">MAR</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Live Q&A Session</p>
                  <p className="text-xs text-slate-500">React Fundamentals · 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <span className="text-xs font-bold leading-none">18</span>
                  <span className="text-[10px] leading-none">MAR</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Assignment Due</p>
                  <p className="text-xs text-slate-500">UI/UX Design · Project 1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <h3 className="font-semibold text-indigo-900">Weekly goal</h3>
            <p className="mt-1 text-sm text-indigo-700">5 of 7 days completed</p>
            <div className="mt-3 flex gap-1.5">
              <span className="h-2 flex-1 rounded-full bg-indigo-600" />
              <span className="h-2 flex-1 rounded-full bg-indigo-600" />
              <span className="h-2 flex-1 rounded-full bg-indigo-600" />
              <span className="h-2 flex-1 rounded-full bg-indigo-600" />
              <span className="h-2 flex-1 rounded-full bg-indigo-600" />
              <span className="h-2 flex-1 rounded-full bg-indigo-200" />
              <span className="h-2 flex-1 rounded-full bg-indigo-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
