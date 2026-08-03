import React from 'react';
import { CheckSquare, XCircle, Clock } from 'lucide-react';
import { mockAttendance } from '../lib/mockData';

const Attendance = () => {
  // SVG circular properties for donut chart
  const radius = 50;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (mockAttendance.overallPercentage / 100) * circumference;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 border border-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 border border-amber-100 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Late
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 border border-red-100 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Absent
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Visual Chart Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* SVG Circular Donut Chart Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Animated SVG Donut Chart */}
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-gray-100"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx="50"
                cy="50"
              />
              {/* Foreground circle with dashoffset */}
              <circle
                className="text-brand-blue transition-all duration-1000 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={normalizedRadius}
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-brand-slate">{mockAttendance.overallPercentage}%</span>
              <span className="text-[9px] font-bold text-brand-gray uppercase tracking-wider">Attendance</span>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-extrabold text-brand-slate text-base">Academic Standings</h4>
            <p className="text-xs text-brand-gray leading-relaxed">
              Your overall attendance is currently at **{mockAttendance.overallPercentage}%**. Excellent compliance with KHDA training guidelines.
            </p>
          </div>
        </div>

        {/* Present/Absent statistics cards block */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-soft p-6 flex flex-col justify-between">
          <h4 className="font-extrabold text-brand-navy text-sm uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">
            Session Analytics Summary
          </h4>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-brand-light p-4 rounded-xl border border-gray-50 space-y-1">
              <div className="text-emerald-500 flex justify-center"><CheckSquare size={20} /></div>
              <p className="text-2xl font-extrabold text-brand-slate mt-1">{mockAttendance.presentCount}</p>
              <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Present</p>
            </div>
            
            <div className="bg-brand-light p-4 rounded-xl border border-gray-50 space-y-1">
              <div className="text-amber-500 flex justify-center"><Clock size={20} /></div>
              <p className="text-2xl font-extrabold text-brand-slate mt-1">{mockAttendance.lateCount}</p>
              <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Late</p>
            </div>

            <div className="bg-brand-light p-4 rounded-xl border border-gray-50 space-y-1">
              <div className="text-red-500 flex justify-center"><XCircle size={20} /></div>
              <p className="text-2xl font-extrabold text-brand-slate mt-1">{mockAttendance.absentCount}</p>
              <p className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Absent</p>
            </div>
          </div>
        </div>

      </div>

      {/* Attendance Detail Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-extrabold text-brand-navy text-base">
            Class Attendance Log
          </h3>
        </div>

        {/* Scrollable responsive table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-light border-b border-gray-200 text-xs font-bold text-brand-slate uppercase tracking-wider">
                <th className="py-4 px-6">Class Date</th>
                <th className="py-4 px-6">Course Name</th>
                <th className="py-4 px-6 hidden md:table-cell">Lesson Topic</th>
                <th className="py-4 px-6">Status Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-brand-slate">
              {mockAttendance.records.map((record) => (
                <tr key={record.id} className="hover:bg-brand-light/30 transition-colors">
                  <td className="py-4.5 px-6 font-semibold whitespace-nowrap">
                    {record.date}
                  </td>
                  <td className="py-4.5 px-6 font-semibold">
                    <p className="truncate max-w-[200px] sm:max-w-none">{record.course}</p>
                  </td>
                  <td className="py-4.5 px-6 text-brand-gray hidden md:table-cell">
                    {record.topic}
                    {record.note && (
                      <span className="block text-[10px] italic text-brand-blue font-semibold mt-0.5">
                        * {record.note}
                      </span>
                    )}
                  </td>
                  <td className="py-4.5 px-6">
                    {getStatusBadge(record.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
