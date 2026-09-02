import { Link } from 'react-router-dom'

const curriculum = [
  { title: 'Introduction to React', duration: '12 min', type: 'video' },
  { title: 'Components & Props', duration: '18 min', type: 'video' },
  { title: 'State & Lifecycle', duration: '22 min', type: 'video' },
  { title: 'Hooks Deep Dive', duration: '25 min', type: 'video' },
  { title: 'Module 1 Quiz', duration: '10 min', type: 'quiz' },
  { title: 'Building a Todo App', duration: '35 min', type: 'video' },
]

export default function CourseDetail() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link to="/courses" className="text-sm font-medium text-indigo-200 hover:text-white">
              ← Back to courses
            </Link>
            <span className="ml-4 rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white">
              Development
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              React Fundamentals
            </h1>
            <p className="mt-4 text-lg text-indigo-100">
              Master the core concepts of React including components, state, hooks, and modern patterns.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-indigo-200">
              <span>By Sarah Chen</span>
              <span className="font-medium text-amber-300">★ 4.9</span>
              <span>12,400 students</span>
              <span>8 hours total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-xl font-bold text-slate-900">What you&apos;ll learn</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-indigo-600">✓</span>
                  Build reusable React components
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-indigo-600">✓</span>
                  Manage state with useState and useReducer
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-indigo-600">✓</span>
                  Handle side effects with useEffect
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-0.5 text-indigo-600">✓</span>
                  Create a full project from scratch
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Course content</h2>
              <p className="mt-1 text-sm text-slate-500">6 sections · 42 lectures · 8h total</p>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {curriculum.map((item, index) => (
                  <div key={item.title} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.title}</p>
                        <p className="text-xs capitalize text-slate-500">{item.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{item.duration}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">About the instructor</h2>
              <div className="mt-4 flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                  SC
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Sarah Chen</h3>
                  <p className="text-sm text-indigo-600">Senior Frontend Engineer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sarah has 10+ years of experience building web applications and has taught over 50,000 students worldwide.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                <span className="text-5xl font-bold text-indigo-300">R</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900">$49</p>
              <button
                type="button"
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Enroll Now
              </button>
              <button
                type="button"
                className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Add to Wishlist
              </button>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span>📹</span> 8 hours on-demand video
                </li>
                <li className="flex items-center gap-2">
                  <span>📄</span> 12 downloadable resources
                </li>
                <li className="flex items-center gap-2">
                  <span>🏆</span> Certificate of completion
                </li>
                <li className="flex items-center gap-2">
                  <span>♾️</span> Lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
