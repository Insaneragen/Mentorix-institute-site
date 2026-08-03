import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

const triggerMockAuthChange = (event) => {
  const customEvent = new CustomEvent('mock-auth-change', { detail: { event } });
  window.dispatchEvent(customEvent);
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signUp: async ({ email, password, options }) => {
          console.warn("Supabase is not configured. Running in Mock Mode.");
          const mockUser = {
            id: 'mock-user-123',
            email,
            user_metadata: {
              full_name: options?.data?.full_name || 'Ahmed Al Mansoori',
              role: options?.data?.role || 'student'
            }
          };
          const mockSession = {
            access_token: 'mock-token-123',
            user: mockUser
          };
          localStorage.setItem('mock_session', JSON.stringify(mockSession));
          triggerMockAuthChange('SIGNED_IN');
          return { data: { user: mockUser, session: mockSession }, error: null };
        },
        signInWithPassword: async ({ email, password }) => {
          console.warn("Supabase is not configured. Running in Mock Mode.");
          
          if (email && password) {
            if (email.toLowerCase().includes('admin')) {
              const mockUser = {
                id: 'mock-admin-999',
                email,
                user_metadata: { 
                  full_name: 'Director Saneesh',
                  role: 'admin'
                }
              };
              const mockSession = {
                access_token: 'mock-token-admin',
                user: mockUser
              };
              localStorage.setItem('mock_session', JSON.stringify(mockSession));
              triggerMockAuthChange('SIGNED_IN');
              return {
                data: {
                  user: mockUser,
                  session: mockSession
                },
                error: null
              };
            }

            // Look up student from storage
            const studentsJson = localStorage.getItem('mentorix_db_students');
            if (studentsJson) {
              try {
                const students = JSON.parse(studentsJson);
                const found = students.find(s => s.email.toLowerCase() === email.toLowerCase() && s.password === password);
                
                if (found) {
                  const mockUser = {
                    id: found.id,
                    email: found.email,
                    user_metadata: { 
                      full_name: found.name,
                      role: 'student'
                    }
                  };
                  const mockSession = {
                    access_token: `mock-token-${found.id}`,
                    user: mockUser
                  };
                  localStorage.setItem('mock_session', JSON.stringify(mockSession));
                  triggerMockAuthChange('SIGNED_IN');
                  return {
                    data: {
                      user: mockUser,
                      session: mockSession
                    },
                    error: null
                  };
                }
              } catch (e) {
                console.error("Auth search failure:", e);
              }
            }
          }
          return { data: { user: null, session: null }, error: new Error("Invalid email or password.") };
        },
        signOut: async () => {
          console.warn("Supabase is not configured. Logging out of Mock Mode.");
          localStorage.removeItem('mock_session');
          triggerMockAuthChange('SIGNED_OUT');
          return { error: null };
        },
        getSession: async () => {
          const sessionJson = localStorage.getItem('mock_session');
          if (sessionJson) {
            try {
              return { data: { session: JSON.parse(sessionJson) }, error: null };
            } catch {
              return { data: { session: null }, error: null };
            }
          }
          return { data: { session: null }, error: null };
        },
        getUser: async () => {
          const sessionJson = localStorage.getItem('mock_session');
          if (sessionJson) {
            try {
              const session = JSON.parse(sessionJson);
              return { data: { user: session.user }, error: null };
            } catch {
              return { data: { user: null }, error: null };
            }
          }
          return { data: { user: null }, error: null };
        },
        onAuthStateChange: (callback) => {
          const handler = (e) => {
            const sessionJson = localStorage.getItem('mock_session');
            const session = sessionJson ? JSON.parse(sessionJson) : null;
            callback(e?.detail?.event || 'SIGNED_IN', session);
          };
          window.addEventListener('mock-auth-change', handler);
          
          const sessionJson = localStorage.getItem('mock_session');
          const session = sessionJson ? JSON.parse(sessionJson) : null;
          setTimeout(() => callback(session ? 'INITIAL_SESSION' : 'SIGNED_OUT', session), 0);

          return {
            data: {
              subscription: {
                unsubscribe: () => window.removeEventListener('mock-auth-change', handler)
              }
            }
          };
        }
      }
    };
