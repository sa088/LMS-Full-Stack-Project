import { Link } from 'react-router-dom'

const courses = [
  { id: 1, title: 'React Fundamentals', instructor: 'Sarah Chen', rating: '4.9', students: '12.4k', price: '$49', category: 'Development', level: 'Beginner' },
  { id: 2, title: 'UI/UX Design Masterclass', instructor: 'Marcus Lee', rating: '4.8', students: '8.2k', price: '$59', category: 'Design', level: 'Intermediate' },
  { id: 3, title: 'Data Science with Python', instructor: 'Aisha Patel', rating: '4.7', students: '15.1k', price: '$69', category: 'Data', level: 'Advanced' },
  { id: 4, title: 'Digital Marketing 101', instructor: 'James Wilson', rating: '4.6', students: '6.8k', price: '$39', category: 'Marketing', level: 'Beginner' },
  { id: 5, title: 'Node.js Backend Development', instructor: 'Sarah Chen', rating: '4.8', students: '9.3k', price: '$54', category: 'Development', level: 'Intermediate' },
  { id: 6, title: 'Business Strategy Essentials', instructor: 'Emily Torres', rating: '4.5', students: '4.2k', price: '$44', category: 'Business', level: 'Beginner' },
]

export default function Courses() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">All Courses</h1>
        <p className="mt-2 text-slate-500">
          Explore our catalog of expert-led courses across every discipline.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search courses..."
            className="w-full max-w-md rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <select className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option>All Categories</option>
          <option>Development</option>
          <option>Design</option>
          <option>Business</option>
          <option>Marketing</option>
          <option>Data Science</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
              <span className="text-4xl font-bold text-indigo-300">{course.category[0]}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                  {course.category}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {course.level}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-amber-500">★ {course.rating}</span>
                  <span>({course.students})</span>
                </div>
                <span className="text-lg font-bold text-indigo-600">{course.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
