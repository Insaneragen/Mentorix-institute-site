import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import AdminRouteGuard from './components/AdminRouteGuard';
import PortalLayout from './components/PortalLayout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import Financials from './pages/Financials';
import Announcements from './pages/Announcements';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDirectory from './pages/admin/StudentDirectory';
import ClassScheduleManager from './pages/admin/ClassScheduleManager';
import AnnouncementsManager from './pages/admin/AnnouncementsManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Student Portal Routes */}
        <Route 
          path="/" 
          element={
            <RouteGuard>
              <PortalLayout />
            </RouteGuard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="financials" element={<Financials />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* Protected Admin Portal Routes */}
        <Route
          path="/admin"
          element={
            <AdminRouteGuard>
              <AdminLayout />
            </AdminRouteGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<StudentDirectory />} />
          <Route path="schedules" element={<ClassScheduleManager />} />
          <Route path="announcements" element={<AnnouncementsManager />} />
        </Route>

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
