import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import RouteGuard from './components/RouteGuard';
import AdminRouteGuard from './components/AdminRouteGuard';
import PortalLayout from './components/PortalLayout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Academics from './pages/Academics';
import StudyHub from './pages/StudyHub';
import Financials from './pages/Financials';
import TestRole from './pages/TestRole';
import WorkInProgress from './pages/WorkInProgress';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDirectory from './pages/admin/StudentDirectory';
import ClassScheduleManager from './pages/admin/ClassScheduleManager';
import AnnouncementsManager from './pages/admin/AnnouncementsManager';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/test-role" element={<TestRole />} />

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
          <Route path="study-hub" element={<StudyHub />} />
          <Route path="academics" element={<Academics />} />
          <Route path="financials" element={<Financials />} />
          <Route path="wip" element={<WorkInProgress />} />
          <Route path="work-in-progress" element={<WorkInProgress />} />
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
          <Route path="wip" element={<WorkInProgress title="Admin Module In Development" />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
