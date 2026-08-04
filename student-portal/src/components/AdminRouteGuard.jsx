import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AdminRouteGuard = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription = null;

    const checkAdminSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
          
          if (!error && profile) {
            setIsAdmin(profile.role === 'admin');
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error verifying admin role:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();

    const authListener = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (currentSession) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .single();
          setIsAdmin(profile?.role === 'admin');
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    subscription = authListener?.data?.subscription || authListener;

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white flex-col gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold tracking-wide text-slate-400">Verifying administrative access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRouteGuard;
