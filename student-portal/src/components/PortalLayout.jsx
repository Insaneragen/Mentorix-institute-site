import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, Bell, ChevronRight, User, Check } from 'lucide-react';
import Sidebar from './Sidebar';
import { getCurrentStudent, hasCheckedInToday, markDailyCheckIn } from '../lib/database';

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [student, setStudent] = useState({ id: null, name: 'Loading...', studentId: '', course_enrolled: 'Loading course...' });
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentStudent();
        if (data) {
          setStudent({
            id: data.id,
            name: data.name || 'Student',
            studentId: data.student_id || 'ID Pending',
            course_enrolled: data.course_enrolled || 'No Enrolled Course'
          });
        }
      } catch (err) {
        console.error("Error fetching student layout profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Load check-in status
  useEffect(() => {
    if (student?.id) {
      const checkStatus = async () => {
        const checked = await hasCheckedInToday(student.id);
        setHasCheckedIn(checked);
      };
      checkStatus();
    }
  }, [student]);

  const handleCheckIn = async () => {
    if (!student?.id) return;
    setCheckingIn(true);
    try {
      const res = await markDailyCheckIn(student.id);
      if (res) {
        setHasCheckedIn(true);
        alert('Daily attendance marked successfully!');
      }
    } catch (err) {
      console.error('Error handling daily check-in:', err);
    } finally {
      setCheckingIn(false);
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard Overview';
      case '/profile':
        return 'My Profile';
      case '/study-hub':
        return 'Study Hub & Materials';
      case '/academics':
        return 'Academic Schedule & Notices';
      case '/financials':
        return 'Financial Statement';
      case '/wip':
      case '/work-in-progress':
        return 'Work In Progress';
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
                <span className="text-brand-blue truncate max-w-[200px] md:max-w-none">{student.course_enrolled}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Mark Attendance check-in button */}
            {hasCheckedIn ? (
              <button
                disabled
                className="bg-emerald-50 text-emerald-600 font-extrabold text-xs px-3.5 py-2 rounded-xl border border-emerald-200 cursor-not-allowed flex items-center gap-1.5 shadow-sm"
              >
                <Check size={14} className="text-emerald-500 stroke-[3]" />
                <span>Attendance Marked</span>
              </button>
            ) : (
              <button
                onClick={handleCheckIn}
                disabled={checkingIn}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span>Mark Attendance</span>
              </button>
            )}

            {/* Notification Alert Feed Link */}
            <div className="relative group cursor-pointer p-2 rounded-full hover:bg-gray-50 border border-gray-100">
              <Bell size={20} className="text-brand-slate hover:text-brand-blue transition-colors" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>

            {/* Quick Profile Avatar Display Linking to Profile */}
            <Link to="/profile" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-brand-slate leading-none mb-1">{student.name}</span>
                <span className="text-[10px] font-semibold text-brand-gray leading-none">{student.studentId}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center font-extrabold text-white text-xs shadow-sm border border-brand-blue/30">
                {student.name.split(' ').map(p => p[0]).join('').toUpperCase()}
              </div>
            </Link>
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
