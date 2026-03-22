import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReadingProgress } from '../../hooks/useReadingProgress';

const NAV = [
  { label: 'الرئيسية', path: '/' },
  { label: 'عن الجامعة', path: '/about' },
  { label: 'البرامج', path: '/programs', mega: true },
  { label: 'القبول', path: '/admissions/apply' },
  { label: 'تواصل', path: '/contact' },
];

const MEGA_COLS = [
  { label: 'كلية الهندسة', items: [{ name: 'هندسة الحاسبات', path: '/programs/1' }, { name: 'هندسة البرمجيات', path: '/programs/4' }] },
  { label: 'كلية الحاسبات', items: [{ name: 'علوم البيانات', path: '/programs/2' }, { name: 'الذكاء الاصطناعي', path: '/programs/5' }] },
  { label: 'إدارة الأعمال', items: [{ name: 'إدارة الأعمال', path: '/programs/3' }, { name: 'ريادة الأعمال', path: '/programs/6' }] },
];

const Navbar = () => {
  const { darkMode, toggleDark, language, toggleLang, user, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useReadingProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); setUserMenu(false); }, [loc.pathname]);

  const isActive = (p) => loc.pathname === p;

  return (
    <>
      <div className="reading-progress" />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? (darkMode ? 'rgba(15,19,12,0.97)' : 'rgba(245,240,232,0.97)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}` : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
              style={{ background: '#2D4A22', borderRadius: '2px' }}>
              <i className="fa-solid fa-graduation-cap text-sm" style={{ color: '#C8A96E' }} />
            </div>
            <div>
              <div className="font-bold text-base leading-tight" style={{ fontFamily: "'Noto Serif Arabic', serif", color: scrolled ? (darkMode ? '#E8E2D8' : '#1A1A14') : '#F5F0E8' }}>
                جامعة المستقبل
              </div>
              <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.12em' }}>
                Future University
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(link => (
              <div key={link.path} className="relative"
                onMouseEnter={() => link.mega && setMegaOpen(true)}
                onMouseLeave={() => link.mega && setMegaOpen(false)}
              >
                <Link
                  to={link.path}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive(link.path)
                      ? '#C8A96E'
                      : scrolled
                        ? (darkMode ? '#A0A090' : '#5C5C4E')
                        : 'rgba(245,240,232,0.85)',
                    fontFamily: "'Noto Serif Arabic', sans-serif",
                  }}
                >
                  {link.label}
                  {link.mega && <i className={`fa-solid fa-chevron-down text-[9px] transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-3 right-3 h-px" style={{ background: '#C8A96E' }} />
                  )}
                </Link>

                {/* Mega Menu */}
                {link.mega && megaOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-[480px] card shadow-2xl p-6 animate-fade-up"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <div className="grid grid-cols-3 gap-5">
                      {MEGA_COLS.map(col => (
                        <div key={col.label}>
                          <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.1em' }}>{col.label}</p>
                          <div className="space-y-1">
                            {col.items.map(item => (
                              <Link key={item.path} to={item.path}
                                className="block px-2 py-1.5 text-sm transition-colors duration-150 rounded-none hover:text-forest border-r-2 border-transparent hover:border-gold-DEFAULT"
                                style={{ color: '#5C5C4E', fontFamily: "'Noto Serif Arabic', sans-serif" }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid #DDD3C2' }}>
                      <Link to="/programs" className="text-xs font-semibold tracking-wide" style={{ color: '#2D4A22' }}>
                        عرض جميع البرامج ←
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Lang */}
            <button onClick={toggleLang}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all"
              style={{
                color: scrolled ? (darkMode ? '#A0A090' : '#5C5C4E') : 'rgba(245,240,232,0.7)',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.05em',
                border: `1px solid ${scrolled ? (darkMode ? '#2A2E24' : '#DDD3C2') : 'rgba(245,240,232,0.2)'}`,
                borderRadius: '2px',
              }}>
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Dark Mode */}
            <button onClick={toggleDark}
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{
                color: scrolled ? (darkMode ? '#C8A96E' : '#5C5C4E') : 'rgba(245,240,232,0.8)',
                border: `1px solid ${scrolled ? (darkMode ? '#2A2E24' : '#DDD3C2') : 'rgba(245,240,232,0.2)'}`,
                borderRadius: '2px',
              }}>
              <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-xs`} />
            </button>

            {/* User */}
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(v => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm transition-all"
                  style={{ background: '#2D4A22', color: '#F5F0E8', borderRadius: '2px', fontFamily: "'Noto Serif Arabic', sans-serif" }}>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <i className="fa-solid fa-chevron-down text-[9px] opacity-70" />
                </button>
                {userMenu && (
                  <div className="absolute top-full left-0 mt-1.5 w-44 card shadow-xl p-1.5 animate-fade-up">
                    <Link to={`/${user.role}`} className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gold-pale rounded-none" style={{ color: '#3A3A2E' }}>
                      <i className="fa-solid fa-gauge text-xs opacity-60" /> لوحة التحكم
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-none"
                      style={{ color: '#8B3A2A' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,58,42,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <i className="fa-solid fa-right-from-bracket text-xs opacity-60" /> تسجيل خروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary text-sm py-2 px-5">دخول</Link>
            )}

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden w-8 h-8 flex items-center justify-center transition-all"
              style={{ color: scrolled ? (darkMode ? '#C8A96E' : '#2D4A22') : '#F5F0E8' }}>
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-16">
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,20,0.6)' }} onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 shadow-2xl flex flex-col animate-slide-left" style={{ background: darkMode ? '#0F130C' : '#F5F0E8', borderLeft: `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}` }}>
            <div className="p-6 border-b" style={{ borderColor: darkMode ? '#2A2E24' : '#DDD3C2' }}>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C8A96E' }}>القائمة الرئيسية</div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {NAV.map(link => (
                <Link key={link.path} to={link.path}
                  className="flex items-center px-4 py-3 text-sm font-medium transition-all border-r-2"
                  style={{
                    color: isActive(link.path) ? '#2D4A22' : (darkMode ? '#A0A090' : '#5C5C4E'),
                    borderColor: isActive(link.path) ? '#C8A96E' : 'transparent',
                    background: isActive(link.path) ? 'rgba(45,74,34,0.06)' : 'transparent',
                    fontFamily: "'Noto Serif Arabic', sans-serif",
                  }}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t flex gap-2" style={{ borderColor: darkMode ? '#2A2E24' : '#DDD3C2' }}>
              <button onClick={toggleLang} className="flex-1 py-2 text-xs font-semibold tracking-widest"
                style={{ border: `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}`, borderRadius: '2px', color: darkMode ? '#A0A090' : '#5C5C4E' }}>
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
              <button onClick={toggleDark} className="w-10 h-9 flex items-center justify-center"
                style={{ border: `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}`, borderRadius: '2px', color: darkMode ? '#C8A96E' : '#2D4A22' }}>
                <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
