import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, phraseTranslations } from '../data/translations';

const AppContext = createContext(null);

const getInitialTheme = () => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [language, setLanguage] = useState(() => localStorage.getItem('lang') || 'ar');
  const [admissionsOpen, setAdmissionsOpen] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', language);
    document.title = language === 'ar' ? 'جامعة المستقبل' : 'Future University';
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

  const t = useCallback((key) => {
    const table = translations[language] || translations.ar;
    if (table[key]) return table[key];
    if (language === 'en' && phraseTranslations[key]) return phraseTranslations[key];
    return key;
  }, [language]);

  const formatNumber = useCallback((value) => Number(value).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US'), [language]);

  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
      toggleDark,
      language,
      setLanguage,
      toggleLang,
      isRTL: language === 'ar',
      admissionsOpen,
      setAdmissionsOpen,
      toasts,
      addToast,
      removeToast,
      user,
      login,
      logout,
      t,
      formatNumber
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
