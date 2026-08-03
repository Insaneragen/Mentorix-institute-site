import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Video, 
  BookMarked,
  ChevronDown,
  ChevronUp,
  Play,
  Clock,
  Sparkles
} from 'lucide-react';
import { getCourses } from '../lib/mockData';

const StudyHub = () => {
  const courses = getCourses();
  const [activeCourseId, setActiveCourseId] = useState(courses[0]?.id);
  const [activeTab, setActiveTab] = useState('materials'); // materials, notes, recordings
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const selectedCourse = courses.find(c => c.id === activeCourseId);

  const handleDownload = (fileName) => {
    alert(`Downloading "${fileName}" to your device...`);
  };

  const handleWatchVideo = (videoTitle) => {
    alert(`Launching lecture recording: "${videoTitle}"`);
  };

  const toggleNote = (id) => {
    setExpandedNoteId(expandedNoteId === id ? null : id);
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Course Selection Tabs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => {
              setActiveCourseId(course.id);
              setActiveTab('materials'); // reset sub-tab
              setExpandedNoteId(null);
            }}
            className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between gap-4 ${
              activeCourseId === course.id
                ? 'bg-white border-brand-blue shadow-md ring-1 ring-brand-blue/30'
                : 'bg-white border-gray-100 hover:border-gray-300 shadow-soft'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold font-mono tracking-wider bg-brand-light text-brand-slate px-2 py-0.5 border rounded">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-brand-gray">
                  Mentor: {course.instructor}
                </span>
              </div>
              <h3 className="font-extrabold text-brand-slate text-base md:text-lg leading-snug">
                {course.name}
              </h3>
            </div>

            {/* Course progress bar */}
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-brand-gray">Course Completion</span>
                <span className="text-brand-blue">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-blue transition-all duration-500" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Course Content Panel */}
      {selectedCourse && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden animate-fadeIn">
          {/* Navigation Tabs Header */}
          <div className="flex border-b border-gray-100 bg-brand-light/40">
            <button
              onClick={() => setActiveTab('materials')}
              className={`flex-1 py-4 px-4 text-center font-bold text-xs md:text-sm border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === 'materials'
                  ? 'border-brand-blue text-brand-blue bg-white'
                  : 'border-transparent text-brand-gray hover:text-brand-slate hover:bg-white/40'
              }`}
            >
              <FileText size={16} />
              <span>Study Materials</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-4 px-4 text-center font-bold text-xs md:text-sm border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === 'notes'
                  ? 'border-brand-blue text-brand-blue bg-white'
                  : 'border-transparent text-brand-gray hover:text-brand-slate hover:bg-white/40'
              }`}
            >
              <BookMarked size={16} />
              <span>Lecture Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('recordings')}
              className={`flex-1 py-4 px-4 text-center font-bold text-xs md:text-sm border-b-2 transition-all flex items-center justify-center gap-2 ${
                activeTab === 'recordings'
                  ? 'border-brand-blue text-brand-blue bg-white'
                  : 'border-transparent text-brand-gray hover:text-brand-slate hover:bg-white/40'
              }`}
            >
              <Video size={16} />
              <span>Recorded Classes</span>
            </button>
          </div>

          {/* Dynamic Tab Panels */}
          <div className="p-6 md:p-8">
            
            {/* TAB 1: STUDY MATERIALS */}
            {activeTab === 'materials' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-brand-gray">
                  <Sparkles size={14} className="text-brand-blue" />
                  <span>Reference materials and regulatory manuals provided by Mentorix faculty.</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedCourse.studyMaterials?.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-white transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue text-xs font-bold shrink-0 border border-gray-100">
                          {file.type}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-brand-slate truncate">{file.name}</p>
                          <p className="text-[10px] font-semibold text-brand-gray uppercase">{file.size} &middot; {file.type} Doc</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(file.name)}
                        className="p-2 rounded-lg bg-brand-light text-brand-slate hover:bg-brand-blue hover:text-white transition-all shadow-sm border border-gray-100 shrink-0"
                        title="Download document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: LECTURE NOTES (Accordions) */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                {selectedCourse.lectureNotes?.map((note) => {
                  const isExpanded = expandedNoteId === note.id;
                  return (
                    <div 
                      key={note.id} 
                      className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleNote(note.id)}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-brand-light/30 hover:bg-brand-light/70 text-left transition-colors"
                      >
                        <span className="text-sm font-bold text-brand-slate">
                          {note.name}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-brand-gray" />
                        ) : (
                          <ChevronDown size={16} className="text-brand-gray" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 md:p-5 bg-white border-t border-gray-100 text-sm text-brand-slate leading-relaxed space-y-2">
                          <p>{note.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 3: RECORDED CLASSES (Video Gallery) */}
            {activeTab === 'recordings' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCourse.recordings?.map((recording) => (
                  <div 
                    key={recording.id} 
                    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    {/* Thumbnail Wrapper */}
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <img 
                        src={recording.thumbnail} 
                        alt={recording.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/20 transition-colors flex items-center justify-center">
                        <button
                          onClick={() => handleWatchVideo(recording.title)}
                          className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                        >
                          <Play size={20} className="ml-1 fill-brand-blue" />
                        </button>
                      </div>
                      {/* Duration badge */}
                      <div className="absolute bottom-2 right-2 bg-brand-navy/80 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                        <Clock size={10} />
                        <span>{recording.duration}</span>
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] font-semibold text-brand-gray">{recording.date}</span>
                      <h4 className="font-bold text-brand-slate text-sm line-clamp-2 leading-snug">
                        {recording.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default StudyHub;
