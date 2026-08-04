import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CreditCard, 
  CheckSquare, 
  ArrowRight, 
  Video, 
  MapPin, 
  User, 
  ChevronRight,
  BellRing,
  GraduationCap
} from 'lucide-react';
import { 
  getCurrentStudent, 
  getCurrentFinancials, 
  getCurrentAttendance, 
  getTimetable, 
  getAnnouncements 
} from '../lib/database';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stu, fin, att, time, ann] = await Promise.all([
          getCurrentStudent(),
          getCurrentFinancials(),
          getCurrentAttendance(),
          getTimetable(),
          getAnnouncements()
        ]);
        setStudent(stu);
        setFinancials(fin);
        setAttendance(att);
        setTimetable(time || []);
        setAnnouncements(ann || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-brand-gray font-semibold animate-pulse">Loading Dashboard...</div>;
  }

  if (!student) {
    return <div className="p-8 text-center text-brand-gray font-semibold">User not found or logged out.</div>;
  }

  // Get upcoming active class
  const upcomingClass = timetable.find(item => item.active) || timetable[0] || null;
  
  // Get top 3 recent announcements
  const recentAnnouncements = announcements.slice(0, 3);

  // Compute greetings based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden bg-brand-navy p-6 md:p-8 rounded-2xl text-white shadow-premium">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue bg-brand-navy-light px-3 py-1 rounded-full">
              Mentorix Student Portal
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {getGreeting()}, {student.name}
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
              Here is your academic overview for today. Stay updated with your timetable and class notifications.
            </p>
          </div>
          <div className="shrink-0 flex gap-2">
            <Link 
              to="/profile" 
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-lg border border-white/10 transition-all flex items-center gap-2"
            >
              <User size={14} />
              <span>View Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview stats cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Fee Balance Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Fee Balance</span>
            <div className="p-2 rounded-lg bg-red-50 text-red-500">
              <CreditCard size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-brand-slate mt-2">
              {financials?.balanceAmount?.toLocaleString() || 0} {financials?.currency || 'AED'}
            </h3>
            <p className="text-xs text-brand-gray mt-1">
              Next installment due on program milestones.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between">
            <Link to="/financials" className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1">
              <span>Financial statement</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Overall Attendance Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Overall Attendance</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500">
              <CheckSquare size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-brand-slate mt-2">
              {attendance?.overallPercentage ?? 100}%
            </h3>
            <p className="text-xs text-brand-gray mt-1">
              Requirement: Keep overall attendance above 80%.
            </p>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between">
            <Link to="/academics" className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1">
              <span>Detailed academics calendar</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Enrolled Courses Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-md transition-shadow flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Active Programs</span>
            <div className="p-2 rounded-lg bg-brand-blue-light text-brand-blue">
              <GraduationCap size={18} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-brand-slate mt-2">
              Course Enrolled
            </h3>
            <p className="text-xs text-brand-gray mt-1 truncate">
              {student.course_enrolled}
            </p>
          </div>
          <div className="border-t border-gray-100 pt-3 mt-3 flex items-center justify-between">
            <Link to="/study-hub" className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1">
              <span>View study hub materials</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Next Upcoming Lecture Card (Col Span 2 on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-soft p-6 flex flex-col justify-between">
          <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
            <h3 className="font-extrabold text-brand-navy flex items-center gap-2">
              <Calendar size={18} className="text-brand-blue" />
              <span>Next Scheduled Class Session</span>
            </h3>
            {upcomingClass?.active && (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </div>

          {upcomingClass ? (
            <>
              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
                    <Video size={24} />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-brand-slate text-base md:text-lg leading-snug">
                      {upcomingClass.courseName || upcomingClass.course_name}
                    </h4>
                    <p className="text-xs font-semibold text-brand-gray">
                      Session Code: <span className="text-brand-slate font-mono">{upcomingClass.code}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-brand-light p-4 rounded-xl border border-gray-100 text-sm">
                  <div>
                    <p className="text-xs font-bold text-brand-gray uppercase">Time slot</p>
                    <p className="font-semibold text-brand-slate mt-1">{upcomingClass.time}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-gray uppercase">Classroom</p>
                    <p className="font-semibold text-brand-slate mt-1 flex items-center gap-1.5">
                      <MapPin size={14} className="text-brand-blue shrink-0" />
                      <span className="truncate">{upcomingClass.room}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-gray uppercase">Lead Mentor</p>
                    <p className="font-semibold text-brand-slate mt-1">{upcomingClass.instructor}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-brand-gray">
                  * Click the join button to launch your videoconference class session.
                </p>
                {upcomingClass.active ? (
                  <a 
                    href={upcomingClass.meetUrl || upcomingClass.meet_url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-blue-500/20 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 animate-pulse"
                  >
                    <Video size={16} />
                    <span>Join Live Class (Online)</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-brand-gray bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg">
                    Classroom Opens 10m Prior
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-brand-gray">No upcoming classes scheduled.</div>
          )}
        </div>

        {/* Recent Announcements Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
              <h3 className="font-extrabold text-brand-navy flex items-center gap-2">
                <BellRing size={18} className="text-brand-blue" />
                <span>Recent Bulletins</span>
              </h3>
            </div>

            <div className="space-y-4">
              {recentAnnouncements.map((item) => (
                <div key={item.id} className="group border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 text-[9px] font-bold border rounded-md uppercase tracking-wider ${item.badgeColor || item.badge_color || 'bg-blue-50 text-blue-700'}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold text-brand-gray">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-brand-slate text-sm group-hover:text-brand-blue transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-brand-gray mt-1 line-clamp-2 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
              {recentAnnouncements.length === 0 && (
                <p className="text-sm text-brand-gray">No new announcements.</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-6">
            <Link 
              to="/academics" 
              className="w-full bg-brand-light hover:bg-gray-100 border border-gray-200 text-brand-slate font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>View All Announcements</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
