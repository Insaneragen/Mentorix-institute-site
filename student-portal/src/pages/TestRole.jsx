import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TestRole = () => {
  const [authData, setAuthData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDiagnostics = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthData(session ? {
          id: session.user.id,
          email: session.user.email,
          user_metadata: session.user.user_metadata,
        } : 'No active session found.');

        if (session) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            setProfileError(error);
          } else {
            setProfileData(data);
          }
        }
      } catch (err) {
        setProfileError({ message: err.message });
      } finally {
        setLoading(false);
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6 font-mono text-xs bg-slate-900 text-slate-100 min-h-screen">
      <h1 className="text-xl font-bold text-emerald-400 mb-4">Portal Connection Diagnostics</h1>
      
      {loading ? (
        <p className="animate-pulse">Running checks...</p>
      ) : (
        <>
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1. Supabase Auth Session</h2>
            <pre className="bg-slate-800 p-4 rounded border border-slate-700 overflow-x-auto">
              {JSON.stringify(authData, null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">2. Database Profile Row</h2>
            <pre className="bg-slate-800 p-4 rounded border border-slate-700 overflow-x-auto">
              {profileData ? JSON.stringify(profileData, null, 2) : 'No profile row found (or blocked by security policies).'}
            </pre>
          </div>

          {profileError && (
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider">Database Fetch Error</h2>
              <pre className="bg-red-950/50 text-red-300 p-4 rounded border border-red-900 overflow-x-auto">
                {JSON.stringify(profileError, null, 2)}
              </pre>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            Current Hostname: {window.location.hostname}
          </div>
        </>
      )}
    </div>
  );
};

export default TestRole;
