import React, { useState } from 'react';
import { 
  Video, 
  MapPin, 
  User, 
  Clock, 
  Sparkles, 
  BellRing, 
  Calendar, 
  Search, 
  Filter,
  CalendarDays,
  Megaphone
} from 'lucide-react';
import { getTimetable, getAnnouncements } from '../lib/mockData';

const Academics = () => {
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' or 'announcements'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const timetable = getTimetable();
  const announcements = getAnnouncements();
  const categories = ['All', 'Academic', 'Event', 'Admin', 'Notice'];

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      {/* Premium Tab Selector */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
            activeTab === 'timetable'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-brand-gray hover:text-brand-slate'
          }`}
        >
          <CalendarDays size={18} />
          <span>My Timetable & Live Classes</span>
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm transition-all ${
            activeTab === 'announcements'
              ? 'border-brand-blue text-brand-blue'
              : 'border-transparent text-brand-gray hover:text-brand-slate'
          }`}
        >
          <Megaphone size={18} />
          <span>Institute Announcements</span>
        </button>
      </div>

      {activeTab === 'timetable' ? (
        <div className="space-y-6 animate-fadeIn">
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
            {timetable.map((session) => (
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
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
          {/* Filtering Options Header Block */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search bulletins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-4 py-2.5 bg-brand-light border border-gray-200 rounded-xl text-xs text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-brand-gray flex items-center gap-1.5 mr-1">
                <Filter size={12} />
                <span>Filter:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                      : 'bg-white border-gray-200 hover:border-brand-gray text-brand-gray hover:text-brand-slate'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bulletins Chronological List */}
          <div className="space-y-6 relative border-l border-gray-200 ml-4 pl-6 md:pl-8">
            {filteredAnnouncements.length === 0 ? (
              <div className="bg-white border border-gray-100 shadow-soft rounded-2xl p-12 text-center text-brand-gray -ml-4 pl-0">
                <BellRing size={36} className="mx-auto mb-3 opacity-30 text-brand-blue" />
                <p className="text-sm font-bold text-brand-slate">No announcements found</p>
                <p className="text-xs mt-1">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              filteredAnnouncements.map((announcement) => (
                <div key={announcement.id} className="relative group">
                  {/* Chronological dot indicator */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-brand-blue group-hover:scale-110 transition-transform"></div>

                  {/* Announcement Card wrapper */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-[9px] font-extrabold border rounded-md uppercase tracking-wider ${announcement.badgeColor}`}>
                          {announcement.category}
                        </span>
                        <span className="text-[10px] font-semibold text-brand-gray flex items-center gap-1">
                          <Calendar size={12} className="shrink-0" />
                          <span>{announcement.date}</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-brand-navy text-base md:text-lg mb-2 leading-snug group-hover:text-brand-blue transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-brand-gray leading-relaxed">
                      {announcement.body}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Academics;
