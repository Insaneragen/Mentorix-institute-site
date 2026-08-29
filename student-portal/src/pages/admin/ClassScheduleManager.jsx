import React, { useState } from 'react';
import { Video, Power } from 'lucide-react';
import { getTimetable, toggleTimetableActive } from '../../lib/mockData';

const ClassScheduleManager = () => {
  const [timetable, setTimetable] = useState(getTimetable());
  const [successMsg, setSuccessMsg] = useState('');

  const handleToggleActive = (id, currentStatus) => {
    const newStatus = !currentStatus;
    const updated = toggleTimetableActive(id, newStatus);
    setTimetable(updated);
    
    const course = updated.find(c => c.id === id);
    setSuccessMsg(`"${course.courseName}" session is now ${newStatus ? 'LIVE' : 'OFFLINE'}!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Description Info Banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-white rounded-xl text-emerald-600 border border-emerald-100 shrink-0">
          <Power size={20} />
        </div>
        <div className="space-y-1 text-xs">
          <h3 className="font-extrabold text-slate-800 text-sm">Timetable Video Broadcast Rules</h3>
          <p className="text-slate-500 leading-relaxed mt-1">
            Toggle a lecture slot to **Active** to publish the videoconference URL to the enrolled student's workspace. The student's dashboard will display a glowing pulse-animation and a **"Join Live Class"** button. Remember to toggle it back to **Offline** when the class session concludes.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl animate-pulse">
          {successMsg}
        </div>
      )}

      {/* Class lists */}
      <div className="space-y-4">
        {timetable.map((session) => (
          <div
            key={session.id}
            className={`bg-white rounded-2xl border transition-all p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              session.active
                ? 'border-emerald-600 shadow-md ring-1 ring-emerald-500/20'
                : 'border-slate-100 shadow-soft hover:border-slate-200'
            }`}
          >
            {/* Class overview */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
              {/* Status Indicator Circle */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                session.active
                  ? 'bg-red-50 border-red-200 text-red-500 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <Video size={20} />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold font-mono bg-slate-100 text-slate-600 px-2 py-0.5 border rounded">
                    {session.code}
                  </span>
                  <span className="text-xs text-slate-500">{session.day}</span>
                </div>
                <h4 className="font-extrabold text-slate-800 text-base leading-snug">
                  {session.courseName}
                </h4>
              </div>
            </div>

            {/* Timetable metadata details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50 text-xs md:w-[320px]">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider block">Scheduled Slot</p>
                <p className="font-bold text-slate-800 mt-1">{session.time}</p>
              </div>
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider block">Meeting Link / Room</p>
                <p className="font-bold text-slate-800 mt-1 truncate" title={session.room}>
                  {session.room}
                </p>
              </div>
            </div>

            {/* Toggle Actions */}
            <div className="shrink-0 flex items-center gap-4">
              <span className={`text-xs font-bold ${session.active ? 'text-red-500 font-extrabold' : 'text-slate-400'}`}>
                {session.active ? 'SESSION LIVE' : 'OFFLINE'}
              </span>
              
              <button
                onClick={() => handleToggleActive(session.id, session.active)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  session.active ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
                title="Toggle session active state"
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    session.active ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassScheduleManager;
