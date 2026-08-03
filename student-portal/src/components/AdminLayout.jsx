import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Users, 
  CalendarClock, 
  Megaphone, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Admin Overview', path: '/admin', icon: TrendingUp },
    { name: 'Student Directory', path: '/admin/students', icon: Users },
    { name: 'Class Schedule Manager', path: '/admin/schedules', icon: CalendarClock },
    { name: 'Announcements Manager', path: '/admin/announcements', icon: Megaphone }
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Admin Overview Statistics';
      case '/admin/students':
        return 'Student Directory & Records';
      case '/admin/schedules':
        return 'Class Scheduling Panel';
      case '/admin/announcements':
        return 'Institute Bulletins Editor';
      default:
        return 'Mentorix Admin';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Admin Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-slate-900 border-r border-slate-800 text-slate-300 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Branding */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 font-black text-white rounded bg-slate-700 text-xl shadow-md border border-slate-600">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-none mb-1">MENTORIX</span>
              <span className="text-[9px] font-semibold text-emerald-500 tracking-wider uppercase leading-none">Administration</span>
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-slate-800 lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Mini Profile */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-950/20">
          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow-sm">
            ADM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Director Saneesh</p>
            <p className="text-[10px] font-bold text-emerald-500 uppercase">System Principal</p>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/admin'}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <span className="flex items-center gap-4">
              <LogOut size={18} />
              <span>Logout Admin</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Body */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-md hover:bg-slate-100 lg:hidden text-slate-700"
            >
              <Menu size={22} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none mb-1">
                {getPageTitle()}
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Management Center</span>
                <ChevronRight size={10} />
                <span className="text-emerald-600 font-semibold uppercase">KHDA Dubai Dashboard</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Operations
            </span>
          </div>
        </header>

        {/* Scrollable container */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
