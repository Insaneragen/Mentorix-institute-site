import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, CheckCircle, GraduationCap } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = async () => {
    setLoading(true);
    // Sign in using our mock bypass credentials
    try {
      const { error: bypassError } = await supabase.auth.signInWithPassword({
        email: 'demo.student@mentorix.ae',
        password: 'demostudentpass'
      });
      if (!bypassError) {
        navigate('/');
      } else {
        setError(bypassError.message);
      }
    } catch (err) {
      setError('Failed to log in to demo mode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Column: Branding Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-soft text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        {/* Top Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded bg-brand-blue text-xl shadow-md">
            M
          </div>
          <div>
            <p className="font-bold text-xl tracking-tight leading-none mb-1">MENTORIX</p>
            <p className="text-[9px] font-bold text-brand-blue tracking-widest uppercase">Where Potential Meets Purpose</p>
          </div>
        </div>

        {/* Brand Core Messaging */}
        <div className="my-auto max-w-lg relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-brand-blue bg-white/5 border border-white/10 rounded-full uppercase mb-6">
            Dubai Training Center
          </span>
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Your Secure Gateway <br />to Academic Success
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-8">
            Access your course materials, timetable, attend live lectures, review financial statements, and check real-time attendance details inside the Mentorix student workspace.
          </p>

          {/* Quick List */}
          <div className="space-y-4 text-sm text-gray-200">
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-brand-blue shrink-0" />
              <span>KHDA-Licensed Training Institute in Dubai</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-brand-blue shrink-0" />
              <span>Interactive classrooms & online lecture recordings</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-brand-blue shrink-0" />
              <span>Global partnerships with university admission options</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-400 relative z-10 border-t border-white/10 pt-6">
          &copy; {new Date().getFullYear()} Mentorix Institute. Licensed by KHDA (Dubai Private Education Permit).
        </div>
      </div>

      {/* Right Column: Secure Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8 md:p-12 xl:p-16">
        <div className="w-full max-w-md mx-auto">
          {/* Logo (Shown on mobile only) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded bg-brand-blue text-xl shadow-sm">
              M
            </div>
            <div>
              <p className="font-extrabold text-lg text-brand-navy leading-none mb-1">MENTORIX</p>
              <p className="text-[8px] font-bold text-brand-blue tracking-wider uppercase">Where Potential Meets Purpose</p>
            </div>
          </div>

          {/* Title Headers */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-sm text-brand-gray">
              Enter your credentials to access your student workspace portal.
            </p>
          </div>

          {/* Alert Notice for Supabase Configuration */}
          {!isSupabaseConfigured && (
            <div className="p-4 mb-6 rounded-lg bg-blue-50 border border-blue-100 text-sm text-brand-navy-light flex items-start gap-3">
              <ShieldAlert size={20} className="text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-navy">Supabase Connection Notice</p>
                <p className="text-xs text-brand-gray mt-1 leading-relaxed">
                  Supabase environment variables are not configured yet. The portal has loaded in <strong>Sandbox Demo Mode</strong>. You can bypass this login screen using the quick demo button below.
                </p>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="student@mentorixacademy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-brand-slate uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-brand-slate placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-sm flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <button
              onClick={handleDemoBypass}
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <GraduationCap size={18} />
              <span>Bypass & Enter Demo Portal</span>
            </button>
            <p className="text-center text-[10px] text-brand-gray mt-2.5 leading-relaxed">
              * Click this button to preview the interface using the pre-loaded student dashboard, enrolled courses, and mock financials data instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
