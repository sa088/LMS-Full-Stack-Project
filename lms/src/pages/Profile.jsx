export default function Profile() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
      <p className="mt-1 text-slate-500">Manage your account information and preferences.</p>

      <div className="mt-8 space-y-8">
        {/* Avatar Section */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Profile Photo</h2>
          <div className="mt-4 flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
              JD
            </div>
            <div>
              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Upload Photo
              </button>
              <p className="mt-2 text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </section>

        {/* Personal Info */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
          <form className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-firstName" className="block text-sm font-medium text-slate-700">
                First name
              </label>
              <input
                id="profile-firstName"
                type="text"
                defaultValue="John"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label htmlFor="profile-lastName" className="block text-sm font-medium text-slate-700">
                Last name
              </label>
              <input
                id="profile-lastName"
                type="text"
                defaultValue="Doe"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                defaultValue="john.doe@example.com"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-bio" className="block text-sm font-medium text-slate-700">
                Bio
              </label>
              <textarea
                id="profile-bio"
                rows={3}
                defaultValue="Passionate learner exploring web development and design."
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </form>
        </section>

        {/* Password */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
          <form className="mt-6 space-y-5">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-slate-700">
                Current password
              </label>
              <input
                id="current-password"
                type="password"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">
                New password
              </label>
              <input
                id="new-password"
                type="password"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </form>
        </section>

        {/* Notifications */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Course updates and announcements</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Weekly progress report</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Promotional emails</span>
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
