import { Link } from 'react-router-dom'

const enrolledCourses = [
  { id: 1, title: 'React Fundamentals', instructor: 'Sarah Chen', progress: 65, lastAccessed: '2 hours ago', totalLessons: 42, completedLessons: 27 },
  { id: 2, title: 'UI/UX Design Masterclass', instructor: 'Marcus Lee', progress: 40, lastAccessed: '1 day ago', totalLessons: 36, completedLessons: 14 },
  { id: 3, title: 'Data Science with Python', instructor: 'Aisha Patel', progress: 20, lastAccessed: '3 days ago', totalLessons: 48, completedLessons: 10 },
  { id: 4, title: 'Digital Marketing 101', instructor: 'James Wilson', progress: 100, lastAccessed: '1 week ago', totalLessons: 24, completedLessons: 24 },
]

export default function MyCourses() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Courses</h1>
          <p className="mt-1 text-slate-500">{enrolledCourses.length} courses enrolled</p>
        </div>
        <div className="flex gap-2">
          <select className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
            <option>All Courses</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 sm:h-24 sm:w-36">
              <span className="text-2xl font-bold text-indigo-300">{course.title[0]}</span>
            </div>

            <div className="flex-1">
              <Link
                to={`/courses/${course.id}`}
                className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
              >
                {course.title}
              </Link>
              <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                <span>Last accessed {course.lastAccessed}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-700">{course.progress}%</span>
              </div>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">
              {course.progress === 100 ? (
                <button
                  type="button"
                  className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
                >
                  Completed ✓
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
