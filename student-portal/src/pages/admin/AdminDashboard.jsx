import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Video, Landmark, CheckSquare, ArrowRight, UserPlus, Megaphone } from 'lucide-react';
import { getStudents, getTimetable } from '../../lib/mockData';

const AdminDashboard = () => {
  const students = getStudents();
  const timetable = getTimetable();

  const totalStudents = students.length;
  const liveClassesCount = timetable.filter(t => t.active).length;

  // Compute total financial metrics
  
  let totalInvoiced = 0;
  let totalCollected = 0;
  
  students.forEach(student => {
    // Attempt to load from storage or fallback
    const key = `mentorix_db_financials_${student.id}`;
    const storageItem = localStorage.getItem(key);
    if (storageItem) {
      const data = JSON.parse(storageItem);
      totalInvoiced += data.totalFee;
      totalCollected += data.paidAmount;
    } else {
      totalInvoiced += 10000;
      totalCollected += 7500;
    }
  });

  const collectionPercentage = totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 0;

  // Compute total average attendance
  let totalPercentageSum = 0;
  students.forEach(student => {
    const key = `mentorix_db_attendance_${student.id}`;
    const storageItem = localStorage.getItem(key);
    if (storageItem) {
      const data = JSON.parse(storageItem);
      totalPercentageSum += data.overallPercentage;
    } else {
      totalPercentageSum += 80;
    }
  });

  const averageAttendance = totalStudents > 0 ? Math.round(totalPercentageSum / totalStudents) : 0;

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
              <Users size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{totalStudents}</h3>
            <p className="text-xs text-slate-500 mt-1">Active registered student accounts.</p>
          </div>
          <div className="border-t border-slate-100 pt-3 mt-3">
            <Link to="/admin/students" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>Student Directory</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Live Classes Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Lectures</span>
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-100">
              <Video size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{liveClassesCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Ongoing class links live now.</p>
          </div>
          <div className="border-t border-slate-100 pt-3 mt-3">
            <Link to="/admin/schedules" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>Schedule controller</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Finance Collections Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tuition Fees Collected</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Landmark size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{collectionPercentage}%</h3>
            <p className="text-xs text-slate-500 mt-1">
              Collected: {totalCollected.toLocaleString()} / {totalInvoiced.toLocaleString()} AED
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3 mt-3">
            <Link to="/admin/students" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>Record payment invoice</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Overall Attendance Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Attendance</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <CheckSquare size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{averageAttendance}%</h3>
            <p className="text-xs text-slate-500 mt-1">Average across all student cohorts.</p>
          </div>
          <div className="border-t border-slate-100 pt-3 mt-3">
            <Link to="/admin/students" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>Attendance logs roster</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Operational Tasks Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Quick Operations Guide */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-soft space-y-4">
          <h3 className="font-extrabold text-slate-950 text-base md:text-lg border-b border-slate-100 pb-4 flex items-center gap-2">
            <UserPlus size={18} className="text-emerald-600" />
            <span>Administrative Quick Actions</span>
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            As an Administrator, you can modify any student's metrics locally. Use the sidebar directory to select a student, toggle attendance checkmarks, or write off outstanding fee balances.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link 
              to="/admin/students" 
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-bold text-slate-800 flex items-center justify-between"
            >
              <span>Manage Students Attendance</span>
              <ArrowRight size={14} className="text-slate-400" />
            </Link>
            <Link 
              to="/admin/announcements" 
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-bold text-slate-800 flex items-center justify-between"
            >
              <span>Publish New Announcement</span>
              <Megaphone size={14} className="text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Timetable status monitor list */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-950 text-base md:text-lg border-b border-slate-100 pb-4 flex items-center gap-2">
              <Video size={18} className="text-emerald-600" />
              <span>Live Class Stream Monitor</span>
            </h3>

            <div className="space-y-3.5 pt-4">
              {timetable.map(slot => (
                <div key={slot.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 truncate">{slot.courseName}</p>
                    <p className="text-[10px] text-slate-500">{slot.day} &middot; {slot.time}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    slot.active 
                      ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}>
                    {slot.active ? 'Streaming Live' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6">
            <Link 
              to="/admin/schedules" 
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Manage Timetable Connections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
