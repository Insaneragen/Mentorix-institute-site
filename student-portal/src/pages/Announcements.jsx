import React, { useState } from 'react';
import { BellRing, Calendar, Search, Filter } from 'lucide-react';
import { mockAnnouncements } from '../lib/mockData';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Academic', 'Event', 'Admin', 'Notice'];

  // Filter announcements
  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
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
  );
};

export default Announcements;
