# LMS Backend (NestJS)

A simple Learning Management System API built for teaching React frontend patterns.

## Stack

- **NestJS 12** — REST API framework
- **SQLite** — zero-config database (file: `lms.sqlite`)
- **TypeORM** — database ORM
- **JWT** — authentication
- **Swagger** — API docs at `/api/docs`

## Quick start

```bash
cd backend
cp .env.example .env
npm install --legacy-peer-deps
npm run start:dev
```

API: http://localhost:3000  
Swagger: http://localhost:3000/api/docs

## Roles

| Role | Can do |
|------|--------|
| `student` | Browse courses, enroll/unenroll, view own enrollments |
| `instructor` | Everything a student can do + create/manage own courses & lessons, view enrollments |
| `admin` | Manage any course |

## Demo accounts (auto-seeded on first run)

| Email | Password | Role |
|-------|----------|------|
| `student@lms.test` | `password123` | student |
| `instructor@lms.test` | `password123` | instructor |
| `admin@lms.test` | `password123` | admin |

## API overview

### Auth
- `POST /auth/register` — create account
- `POST /auth/login` — returns `{ accessToken, user }`
- `GET /auth/me` — current user (Bearer token)

### Courses
- `GET /courses` — list all (public)
- `GET /courses/:id` — course detail with lessons (public)
- `POST /courses` — create (instructor/admin)
- `PATCH /courses/:id` — update (owner/admin)
- `DELETE /courses/:id` — delete (owner/admin)

### Lessons
- `GET /courses/:courseId/lessons` — list lessons (public)
- `POST /courses/:courseId/lessons` — add lesson (owner/admin)
- `PATCH /lessons/:id` — update lesson (owner/admin)
- `DELETE /lessons/:id` — delete lesson (owner/admin)

### Enrollments
- `POST /courses/:courseId/enroll` — enroll (student)
- `DELETE /courses/:courseId/enroll` — unenroll (student)
- `GET /me/enrollments` — my enrolled courses (authenticated)
- `GET /courses/:courseId/enrollments` — students in course (owner/admin)

## Frontend integration tips

Send the JWT on protected requests:

```
Authorization: Bearer <accessToken>
```

CORS is enabled for `http://localhost:5173` (Vite default).

Example TanStack Query fetch:

```ts
const res = await fetch('http://localhost:3000/courses');
const courses = await res.json();
```

Store `accessToken` and `user` in Zustand after login — use TanStack Query for server data.
