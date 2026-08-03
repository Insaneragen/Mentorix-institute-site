import React, { useState } from 'react';
import { Megaphone, PlusCircle, Search, Trash2, Calendar, Sparkles } from 'lucide-react';
import { getAnnouncements, addAnnouncement } from '../../lib/mockData';

const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState(getAnnouncements());
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('Academic');
  const [success, setSuccess] = useState('');

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert("Please fill in both the title and body of the announcement.");
      return;
    }

    let badgeColor = "bg-slate-50 text-slate-700 border-slate-100";
    if (category === 'Academic') badgeColor = "bg-red-50 text-red-700 border-red-100";
    else if (category === 'Event') badgeColor = "bg-blue-50 text-blue-700 border-blue-100";
    else if (category === 'Admin') badgeColor = "bg-amber-50 text-amber-700 border-amber-100";

    const newItem = {
      title,
      body,
      date: new Date().toISOString().split('T')[0],
      category,
      badgeColor
    };

    addAnnouncement(newItem);

    // Refresh state
    setAnnouncements(getAnnouncements());
    setTitle('');
    setBody('');
    setSuccess('Announcement published successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-start">
      
      {/* LEFT COLUMN: Create Announcement Form (1 Column) */}
      <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-soft p-5 space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2.5 flex items-center gap-2">
          <Megaphone size={16} className="text-emerald-600" />
          <span>Publish New Bulletin</span>
        </h3>

        {success && (
          <div className="p-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bulletin Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Midterm Grades Released"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Category Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
            >
              <option>Academic</option>
              <option>Admin</option>
              <option>Event</option>
              <option>Notice</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detailed Content</label>
            <textarea
              rows="5"
              required
              placeholder="Provide complete announcements details here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <PlusCircle size={14} />
            <span>Publish Bulletin</span>
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Announcements wall timeline monitor (2 Columns) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-soft p-6">
        <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-4 mb-4">
          Published Announcements Wall
        </h3>

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {announcements.map((item) => (
            <div 
              key={item.id}
              className="border border-slate-100 hover:border-slate-200 rounded-xl p-4 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[9px] font-extrabold border rounded-md uppercase tracking-wider ${item.badgeColor}`}>
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Calendar size={11} />
                  <span>{item.date}</span>
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnnouncementsManager;
