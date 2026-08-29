import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home, Compass } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg bg-white border border-gray-100 rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 text-center relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-100 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Visual Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100 shadow-sm">
          <FileQuestion size={44} className="stroke-[2]" />
        </div>

        {/* 404 Number Badge */}
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 font-extrabold text-xs tracking-widest uppercase rounded-full mb-3">
          Error 404
        </span>

        <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-2 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          The requested page could not be found, may have moved, or is temporarily under development.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md shadow-brand-blue/20 transition-all flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Go to Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
