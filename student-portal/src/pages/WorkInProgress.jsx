import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Construction, 
  ArrowLeft, 
  LayoutDashboard, 
  Sparkles, 
  Clock, 
  Wrench, 
  HelpCircle, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const WorkInProgress = ({ 
  title = "Feature Under Construction", 
  subtitle = "We're working hard to bring this feature to you soon! Our engineering team is currently building and testing this module.",
  badge = "Work In Progress",
  estimatedDate = "Coming Soon in next update",
  showDashboardLink = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve optional customized state passed via navigate('/wip', { state: { ... } })
  const state = location.state || {};
  const displayTitle = state.title || title;
  const displaySubtitle = state.subtitle || subtitle;
  const displayBadge = state.badge || badge;
  const featureName = state.featureName || null;

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl shadow-xl shadow-slate-100/80 p-6 md:p-10 text-center relative overflow-hidden">
        
        {/* Subtle Background Accent Glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <Wrench size={13} className="text-amber-600" />
          <span>{displayBadge}</span>
        </div>

        {/* Graphic Icon Cluster */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-50 rounded-2xl rotate-6 border border-blue-100 transition-transform hover:rotate-12 duration-300"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-navy rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/25">
            <Construction size={40} className="stroke-[2.2] animate-bounce-subtle" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white shadow-sm">
            <Sparkles size={14} />
          </div>
        </div>

        {/* Feature Title & Description */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight mb-3">
          {featureName ? `${featureName} - Work in Progress` : displayTitle}
        </h2>
        <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto leading-relaxed mb-6">
          {displaySubtitle}
        </p>

        {/* Progress & Highlights Card */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 md:p-5 mb-8 text-left max-w-lg mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-blue" />
              <span>Status: In Active Development</span>
            </span>
            <span className="text-brand-blue">{estimatedDate}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-3">
            <div className="bg-gradient-to-r from-brand-blue to-indigo-600 h-2 rounded-full w-[78%] animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" /> UI / UX Designed
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-500" /> Backend Integration
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-amber-500 border-t-transparent animate-spin inline-block"></span> Final Testing
            </span>
            <span className="flex items-center gap-1">
              <AlertCircle size={12} className="text-slate-400" /> Live Deployment
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          {showDashboardLink && (
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md shadow-brand-blue/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LayoutDashboard size={16} />
              <span>Return to Dashboard</span>
            </Link>
          )}
        </div>

        {/* Support note */}
        <p className="text-[11px] text-gray-400 mt-6 flex items-center justify-center gap-1.5">
          <HelpCircle size={13} />
          <span>Need immediate assistance? Contact Mentorix Student Support.</span>
        </p>
      </div>
    </div>
  );
};

export default WorkInProgress;
