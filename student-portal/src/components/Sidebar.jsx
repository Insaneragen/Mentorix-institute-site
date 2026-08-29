import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  CircleDollarSign, 
  Bell, 
  LogOut,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentStudent } from '../lib/database';
import logoImg from '../assets/logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    window.location.reload();
  };

  const [student, setStudent] = useState({ name: 'Loading...', studentId: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentStudent();
        if (data) {
          setStudent({
            name: data.name || 'Student',
            studentId: data.student_id || 'ID Pending'
          });
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Academics', path: '/academics', icon: Calendar },
    { name: 'Study Hub', path: '/study-hub', icon: BookOpen },
    { name: 'Financials', path: '/financials', icon: CircleDollarSign },
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 bg-brand-navy border-r border-brand-navy-light text-gray-300 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header/Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-brand-navy-light">
          <div className="flex items-center">
            <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm">
              <img src={logoImg} alt="Mentorix Institute" className="h-7 w-auto object-contain" />
            </div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-brand-navy-light lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Student Mini Profile Info */}
        <div className="p-6 border-b border-brand-navy-light flex items-center gap-4 bg-brand-navy-dark/40">
          <div className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center font-extrabold text-white text-base shadow-sm border border-brand-blue/30">
            {getInitials(student.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{student.name}</p>
            <p className="text-xs text-gray-400 truncate">{student.studentId}</p>
          </div>
        </div>

        {/* Navigation Menu Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                      : 'hover:bg-brand-navy-light hover:text-white text-gray-400'
                  }`
                }
              >
                <Icon size={18} className="transition-transform group-hover:scale-105" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Logout Action */}
        <div className="p-4 border-t border-brand-navy-light">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <span className="flex items-center gap-4">
              <LogOut size={18} />
              <span>Logout</span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
