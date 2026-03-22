import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [language, setLanguage] = useState(() => localStorage.getItem('lang') || 'ar');
  const [admissionsOpen, setAdmissionsOpen] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', language);
  }, [language]);

  const toggleDark = () => setDarkMode(p => !p);
  const toggleLang = () => setLanguage(p => p === 'ar' ? 'en' : 'ar');

  const removeToast = useCallback((id) => setToasts(p => p.filter(t => t.id !== id)), []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    if (type !== 'error') setTimeout(() => removeToast(id), 3500);
  }, [removeToast]);

  const login = (u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem('user'); };

  return (
    <AppContext.Provider value={{ darkMode, toggleDark, language, toggleLang, admissionsOpen, setAdmissionsOpen, toasts, addToast, removeToast, user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
