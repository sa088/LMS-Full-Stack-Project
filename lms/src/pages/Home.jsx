import { Link } from 'react-router-dom'

const featuredCourses = [
  { id: 1, title: 'React Fundamentals', instructor: 'Sarah Chen', rating: '4.9', students: '12.4k', price: '$49', category: 'Development' },
  { id: 2, title: 'UI/UX Design Masterclass', instructor: 'Marcus Lee', rating: '4.8', students: '8.2k', price: '$59', category: 'Design' },
  { id: 3, title: 'Data Science with Python', instructor: 'Aisha Patel', rating: '4.7', students: '15.1k', price: '$69', category: 'Data' },
]

const categories = ['Development', 'Design', 'Business', 'Marketing', 'Data Science', 'Photography']

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
              Welcome to LearnHub
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Learn without limits
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Start, switch, or advance your career with thousands of courses from expert instructors.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
              >
                Explore Courses
              </Link>
              <Link
                to="/signup"
                className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">500+</p>
            <p className="mt-1 text-sm text-slate-500">Courses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">50k+</p>
            <p className="mt-1 text-sm text-slate-500">Students</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">120+</p>
            <p className="mt-1 text-sm text-slate-500">Instructors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">4.8</p>
            <p className="mt-1 text-sm text-slate-500">Avg. Rating</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="flex cursor-pointer flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <span className="text-lg font-bold">{cat[0]}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-700">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured courses</h2>
            <Link to="/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-44 items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100">
                  <span className="text-4xl font-bold text-indigo-300">{course.category[0]}</span>
                </div>
                <div className="p-5">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                    {course.category}
                  </span>
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
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-indigo-600 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to start learning?</h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Join LearnHub today and get access to hundreds of courses taught by industry experts.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50"
          >
            Create free account
          </Link>
        </div>
      </section>
    </div>
  )
}
