import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, CheckCircle, GraduationCap, ShieldAlert as AdminIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      setError('Please type your registered email address first.');
      setSuccessMessage('');
      return;
    }
    setError('');
    
    // Look up password in mock student storage
    const studentsJson = localStorage.getItem('mentorix_db_students');
    let passFound = 'demostudentpass';
    if (studentsJson) {
      try {
        const students = JSON.parse(studentsJson);
        const found = students.find(s => s.email && s.email.trim().toLowerCase() === email.trim().toLowerCase());
        if (found) {
          passFound = found.password || 'demostudentpass';
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    setSuccessMessage(`A password recovery email has been simulated and sent to ${email.trim()}! (Your account login password is: "${passFound}")`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // Query the database to check their true role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          setError('Failed to fetch user profile.');
          return;
        }

        const role = profile?.role || 'student';
        if (role === 'admin') {
          navigate('/admin');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = async (roleType) => {
    setLoading(true);
    try {
      const bypassEmail = roleType === 'admin' ? 'admin@mentorix.ae' : 'demo.student@mentorix.ae';
      const bypassPass = roleType === 'admin' ? 'demoadminpass' : 'demostudentpass';
      
      const { data, error: bypassError } = await supabase.auth.signInWithPassword({
        email: bypassEmail,
        password: bypassPass
      });

      if (!bypassError) {
        if (roleType === 'admin') {
          navigate('/admin');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      } else {
        setError(bypassError.message);
      }
    } catch {
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
        <div className="flex items-center relative z-10">
          <div className="bg-white px-3 py-2 rounded-2xl shadow-md">
            <img src="/logo.png" alt="Mentorix Institute" className="h-8 w-auto object-contain" />
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
          <div className="flex items-center mb-8 lg:hidden">
            <img src="/logo.png" alt="Mentorix Institute" className="h-9 w-auto object-contain" />
          </div>

          {/* Title Headers */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-sm text-brand-gray">
              Enter your credentials to access your portal workspace.
            </p>
          </div>

          {/* Alert Notice for Supabase Configuration */}
          {!isSupabaseConfigured && (
            <div className="p-4 mb-6 rounded-lg bg-blue-50 border border-blue-100 text-sm text-brand-navy-light flex items-start gap-3">
              <ShieldAlert size={20} className="text-brand-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-navy">Supabase Connection Notice</p>
                <p className="text-xs text-brand-gray mt-1 leading-relaxed">
                  Supabase environment variables are not configured. The portal has loaded in **Sandbox Demo Mode**. Use the quick bypass buttons below to preview the workspaces.
                </p>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg animate-fadeIn">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="p-3 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg animate-fadeIn">
                {successMessage}
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
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
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

          {/* Quick Demo Bypass Options (Shown ONLY on Localhost for testing) */}
          {isLocalhost && (
            <div className="mt-6 border-t border-gray-200 pt-6 space-y-3">
              <button
                onClick={() => handleDemoBypass('student')}
                disabled={loading}
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <GraduationCap size={18} />
                <span>Bypass & Enter Student Portal</span>
              </button>

              <button
                onClick={() => handleDemoBypass('admin')}
                disabled={loading}
                className="w-full bg-brand-slate hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <AdminIcon size={16} />
                <span>Bypass & Enter Admin Portal</span>
              </button>
              
              <p className="text-center text-[10px] text-brand-gray mt-2.5 leading-relaxed">
                * Click the buttons above to instantly preview either workspace layout with fully pre-loaded mock records.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
