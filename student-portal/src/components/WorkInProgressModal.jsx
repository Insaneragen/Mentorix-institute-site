import React from 'react';
import { Construction, X, Clock } from 'lucide-react';

const WorkInProgressModal = ({ isOpen, onClose, featureName = "This Feature" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8 text-center overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-brand-blue to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/25">
          <Construction size={32} className="stroke-[2.2]" />
        </div>

        {/* Status */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          Under Development
        </span>

        <h3 className="text-xl font-extrabold text-brand-navy mb-2">
          {featureName} is Coming Soon
        </h3>
        
        <p className="text-xs md:text-sm text-gray-500 mb-6 leading-relaxed">
          We are currently finalizing the build and test process for this section. It will be unlocked in the upcoming release.
        </p>

        {/* Status card */}
        <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 mb-6 text-left text-xs text-slate-600 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1 text-brand-blue">
              <Clock size={13} /> Status
            </span>
            <span className="text-emerald-600">~80% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-brand-blue h-1.5 rounded-full w-4/5"></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-bold rounded-xl shadow-md shadow-brand-blue/20 transition-all cursor-pointer"
        >
          Got it, Thanks!
        </button>
      </div>
    </div>
  );
};

export default WorkInProgressModal;
