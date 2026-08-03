import React from 'react';
import { Video, MapPin, User, Clock, Sparkles } from 'lucide-react';
import { mockTimetable } from '../lib/mockData';

const Timetable = () => {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Informative Header Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <div className="p-2 bg-white rounded-xl text-brand-blue border border-blue-100 shrink-0">
          <Sparkles size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-brand-navy text-sm md:text-base">
            Class Connection Instructions
          </h3>
          <p className="text-xs text-brand-gray leading-relaxed">
            Live classes open 10 minutes before the scheduled time slot. Click the **Join Live Class** button to connect via Google Meet. In-centre lectures are held at our Dubai headquarters as scheduled. Attendance is recorded automatically upon entry.
          </p>
        </div>
      </div>

      {/* Timetable Schedule List */}
      <div className="space-y-4">
        {mockTimetable.map((session) => (
          <div 
            key={session.id}
            className={`bg-white rounded-2xl border transition-all p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              session.active 
                ? 'border-brand-blue shadow-md ring-1 ring-brand-blue/30 relative overflow-hidden' 
                : 'border-gray-100 shadow-soft hover:border-gray-200'
            }`}
          >
            {/* Active session glowing top-line decorator */}
            {session.active && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-blue animate-pulse"></div>
            )}

            {/* Left section: Day & Basic Course Titles */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 flex-1 min-w-0">
              {/* Day badge block */}
              <div className={`w-24 px-4 py-2.5 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                session.active
                  ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue font-extrabold'
                  : 'bg-brand-light border-gray-100 text-brand-slate font-bold'
              }`}>
                <span className="text-[10px] uppercase tracking-wider leading-none mb-1">Weekly</span>
                <span className="text-sm leading-none">{session.day}</span>
              </div>

              {/* Class info */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold font-mono bg-brand-light text-brand-slate px-2 py-0.5 border rounded">
                    {session.code}
                  </span>
                  {session.active && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold text-red-600 bg-red-50 border border-red-100 rounded-md animate-pulse">
                      LIVE NOW
                    </span>
                  )}
                </div>
                <h4 className="font-extrabold text-brand-slate text-base md:text-lg leading-snug">
                  {session.courseName}
                </h4>
              </div>
            </div>

            {/* Middle Section: Time details, classroom assignment, and mentor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-light/50 p-4 rounded-xl border border-gray-50 text-sm md:w-[480px]">
              <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                  <Clock size={10} />
                  <span>Time</span>
                </p>
                <p className="font-bold text-brand-slate mt-1 text-xs">{session.time}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={10} />
                  <span>Location</span>
                </p>
                <p className="font-bold text-brand-slate mt-1 text-xs truncate" title={session.room}>
                  {session.room}
                </p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                  <User size={10} />
                  <span>Instructor</span>
                </p>
                <p className="font-bold text-brand-slate mt-1 text-xs truncate">{session.instructor}</p>
              </div>
            </div>

            {/* Right section: Action Buttons */}
            <div className="shrink-0 flex items-center justify-end">
              {session.active ? (
                <a 
                  href={session.meetUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Video size={16} />
                  <span>Join Live Class</span>
                </a>
              ) : (
                <span className="text-xs font-semibold text-brand-gray bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-lg w-full sm:w-auto text-center cursor-not-allowed">
                  Inactive Slot
                </span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
