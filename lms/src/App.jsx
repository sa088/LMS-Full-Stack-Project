import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layout/AuthLayout'
import MainLayout from './components/layout/MainLayout'
import CourseDetail from './pages/CourseDetail'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import MyCourses from './pages/MyCourses'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
