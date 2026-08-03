import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import { mockStudent } from '../lib/mockData';

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard Overview';
      case '/profile':
        return 'My Profile';
      case '/courses':
        return 'Enrolled Courses & Materials';
      case '/timetable':
        return 'Academic Timetable';
      case '/attendance':
        return 'Attendance Tracker';
      case '/financials':
        return 'Financial Statement';
      case '/announcements':
        return 'Institute Announcements';
      default:
        return 'Mentorix Portal';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-brand-light">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Panel Viewport */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Bar */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-md hover:bg-gray-100 lg:hidden text-brand-slate"
            >
              <Menu size={22} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-extrabold text-brand-navy leading-none mb-1">
                {getPageTitle()}
              </h1>
              <p className="text-[10px] md:text-xs text-brand-gray font-medium flex items-center gap-1.5">
                <span>Student Hub</span>
                <ChevronRight size={10} />
                <span className="text-brand-blue truncate max-w-[200px] md:max-w-none">{mockStudent.program}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Alert Feed Link */}
            <div className="relative group cursor-pointer p-2 rounded-full hover:bg-gray-50 border border-gray-100">
              <Bell size={20} className="text-brand-slate hover:text-brand-blue transition-colors" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>

            {/* Quick Profile Name Display (Hidden on Small Screens) */}
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-bold text-brand-slate">{mockStudent.name}</span>
              <span className="text-[10px] font-semibold text-brand-gray">{mockStudent.id}</span>
            </div>
          </div>
        </header>

        {/* Scrollable Viewport Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
