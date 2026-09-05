import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from "./pages/AdminPanel";
import CourseDetail from "./pages/CourseDetail";
import CourseEditor from "./pages/CourseEditor";
import CourseStudents from "./pages/CourseStudents";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InstructorDashboard from "./pages/InstructorDashboard";
import LessonViewer from "./pages/LessonViewer";
import Login from "./pages/Login";
import ManageLessons from "./pages/ManageLessons";
import MyCourses from "./pages/MyCourses";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route
          path="courses/:id/lessons/:lessonId"
          element={
            <ProtectedRoute>
              <LessonViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute roles={["student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-courses"
          element={
            <ProtectedRoute roles={["student"]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="instructor/dashboard"
          element={
            <ProtectedRoute roles={["instructor", "admin"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/courses/new"
          element={
            <ProtectedRoute roles={["instructor", "admin"]}>
              <CourseEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/courses/:id/edit"
          element={
            <ProtectedRoute roles={["instructor", "admin"]}>
              <CourseEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/courses/:id/lessons"
          element={
            <ProtectedRoute roles={["instructor", "admin"]}>
              <ManageLessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="instructor/courses/:id/students"
          element={
            <ProtectedRoute roles={["instructor", "admin"]}>
              <CourseStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
