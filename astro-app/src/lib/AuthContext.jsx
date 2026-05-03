import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabase.js';

const AuthContext = createContext(null);

/* ── Modal state lives here so any component can trigger it ── */
const ModalContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  /* Modal state */
  const [modalOpen,      setModalOpen]      = useState(false);
  const [onSuccessCb,    setOnSuccessCb]    = useState(null);
  const [redirectAction, setRedirectAction] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u && onSuccessCb) {
        onSuccessCb();
        setOnSuccessCb(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /** Call this from any component to require auth before proceeding */
  const requireAuth = useCallback((onSuccess) => {
    if (user) {
      onSuccess?.();
    } else {
      setOnSuccessCb(() => onSuccess);
      setModalOpen(true);
    }
  }, [user]);

  const openModal  = useCallback(() => setModalOpen(true),  []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    setOnSuccessCb(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, requireAuth }}>
      <ModalContext.Provider value={{ modalOpen, openModal, closeModal, redirectAction, setRedirectAction }}>
        {children}
      </ModalContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth      = () => useContext(AuthContext);
export const useAuthModal = () => useContext(ModalContext);
