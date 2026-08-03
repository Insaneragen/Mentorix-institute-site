import React from 'react';
import { User, Mail, Phone, Calendar, ShieldCheck, GraduationCap, Building2 } from 'lucide-react';
import { mockStudent } from '../lib/mockData';

const Profile = () => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
      {/* Profile Main Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Background glow decorator */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl"></div>

        {/* Profile Avatar Initials */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-brand-navy flex items-center justify-center font-extrabold text-white text-3xl shadow-md border-4 border-brand-blue/20 shrink-0">
          {getInitials(mockStudent.name)}
        </div>

        {/* Primary Details */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-flex px-3 py-1 bg-brand-blue-light text-brand-blue border border-brand-blue/15 text-[10px] uppercase font-extrabold rounded-full tracking-wider">
            Active Student Profile
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-slate tracking-tight">
            {mockStudent.name}
          </h2>
          <p className="text-sm font-semibold text-brand-gray">
            ID Code: <span className="font-mono text-brand-slate">{mockStudent.id}</span>
          </p>
        </div>
      </div>

      {/* Grid: Core Info & Regulatory Verification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Contact & Administrative Details (Spans 2 columns) */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-soft p-6 md:p-8 space-y-6">
          <h3 className="font-extrabold text-brand-navy text-lg border-b border-gray-100 pb-4 flex items-center gap-2">
            <User size={18} className="text-brand-blue" />
            <span>Administrative Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider block">Registered Program</span>
              <p className="text-sm font-bold text-brand-slate flex items-start gap-2">
                <GraduationCap size={16} className="text-brand-blue mt-0.5 shrink-0" />
                <span>{mockStudent.program}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider block">Enrolment Date</span>
              <p className="text-sm font-bold text-brand-slate flex items-center gap-2">
                <Calendar size={16} className="text-brand-blue shrink-0" />
                <span>{mockStudent.joinedDate}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider block">Institutional Email</span>
              <p className="text-sm font-bold text-brand-slate flex items-center gap-2">
                <Mail size={16} className="text-brand-blue shrink-0" />
                <a href={`mailto:${mockStudent.email}`} className="hover:underline text-brand-blue truncate">{mockStudent.email}</a>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider block">Contact Number</span>
              <p className="text-sm font-bold text-brand-slate flex items-center gap-2">
                <Phone size={16} className="text-brand-blue shrink-0" />
                <span>{mockStudent.phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* KHDA Trust Badge Card */}
        <div className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-blue text-lg">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-white text-base">Regulatory Status</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Mentorix Academy is a licensed Private Training Institute operating under regulatory permits approved by the **Knowledge and Human Development Authority (KHDA)** in Dubai, UAE.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mt-6 flex items-center gap-3">
            <Building2 size={16} className="text-brand-blue shrink-0" />
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              KHDA Dubai Approved
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
