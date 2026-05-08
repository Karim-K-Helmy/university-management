import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReadingProgress } from '../../hooks/useReadingProgress';

const Navbar = () => {
  const { darkMode, toggleDark, language, toggleLang, user, logout, t } = useApp();
  const isEnglish = language === 'en';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useReadingProgress();

  const NAV = [
    { label: t('home'), path: '/' },
    { label: t('about'), path: '/about' },
    { label: t('programs'), path: '/programs', mega: true },
    { label: t('admissions'), path: '/admissions/apply' },
    { label: t('contact_admin'), path: '/contact-admin' },
  ];

  const MEGA_COLS = [
    { label: t('engineering'), items: [{ name: t('computer_eng'), path: '/programs/1' }, { name: t('software_eng'), path: '/programs/4' }] },
    { label: t('computing'), items: [{ name: t('data_science'), path: '/programs/2' }, { name: t('ai'), path: '/programs/5' }] },
    { label: t('business'), items: [{ name: t('business_admin'), path: '/programs/3' }, { name: t('entrepreneurship'), path: '/programs/6' }] },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); setUserMenu(false); }, [loc.pathname, language]);

  const isActive = (p) => loc.pathname === p || (p !== '/' && loc.pathname.startsWith(p));
  const solidHeader = scrolled || loc.pathname !== '/';
  const foreground = solidHeader ? (darkMode ? '#FFF8EA' : '#1A1A14') : '#F5F0E8';
  const muted = solidHeader ? (darkMode ? '#D8CCB8' : '#3A3A2E') : 'rgba(245,240,232,0.9)';

  return (
    <>
      <div className="reading-progress" />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: solidHeader ? (darkMode ? 'rgba(15,19,12,0.97)' : 'rgba(245,240,232,0.97)') : 'transparent',
          backdropFilter: solidHeader ? 'blur(12px)' : 'none',
          borderBottom: solidHeader ? `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}` : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 xl:px-10 flex items-center justify-between h-16 md:h-18 gap-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: '#2D4A22', borderRadius: '2px' }}>
              <img src="/assets/images/favicon.png" alt="" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="font-bold text-sm md:text-base leading-tight whitespace-nowrap" style={{ fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, sans-serif" : "'Noto Serif Arabic', serif", color: foreground }}>
                {t('future_uni')}
              </div>
              <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.12em' }}>
                {isEnglish ? 'Academic Portal' : 'Future University'}
              </div>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center min-w-0">
            {NAV.map(link => (
              <div key={link.path} className="relative" onMouseEnter={() => link.mega && setMegaOpen(true)} onMouseLeave={() => link.mega && setMegaOpen(false)}>
                <Link
                  to={link.path}
                  className="flex items-center gap-1 py-2 text-sm font-semibold transition-all duration-200 relative whitespace-nowrap"
                  style={{ paddingInline: isEnglish ? '0.65rem' : '1rem', color: isActive(link.path) ? '#C8A96E' : muted, fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, sans-serif" : "'Noto Serif Arabic', sans-serif" }}
                >
                  {link.label}
                  {link.mega && <i className={`fa-solid fa-chevron-down text-[9px] transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />}
                  {isActive(link.path) && <span className="absolute bottom-0 left-3 right-3 h-px" style={{ background: '#C8A96E' }} />}
                </Link>

                {link.mega && megaOpen && (
                  <div className="absolute top-full mt-2 w-[520px] card shadow-2xl p-6 animate-fade-up" style={{ right: language === 'ar' ? 0 : 'auto', left: language === 'en' ? 0 : 'auto' }}>
                    <div className="grid grid-cols-3 gap-5">
                      {MEGA_COLS.map(col => (
                        <div key={col.label}>
                          <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.1em' }}>{col.label}</p>
                          <div className="space-y-1">
                            {col.items.map(item => (
                              <Link key={item.path} to={item.path} className="block px-2 py-1.5 text-sm transition-colors duration-150 rounded-none hover:text-forest border-r-2 border-transparent hover:border-gold-DEFAULT" style={{ color: darkMode ? '#FFF8EA' : '#3A3A2E', fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, sans-serif" : "'Noto Serif Arabic', sans-serif" }}>
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}` }}>
                      <Link to="/programs" className="text-xs font-semibold tracking-wide" style={{ color: darkMode ? '#C8A96E' : '#2D4A22' }}>{t('view_all')}</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={toggleLang} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all" style={{ color: muted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.05em', border: `1px solid ${solidHeader ? (darkMode ? '#3A3F32' : '#C8BCA8') : 'rgba(245,240,232,0.3)'}`, borderRadius: '2px' }}>
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            <button onClick={toggleDark} className="w-8 h-8 flex items-center justify-center transition-all" aria-label={darkMode ? t('theme_light') : t('theme_dark')} style={{ color: solidHeader ? (darkMode ? '#C8A96E' : '#2D4A22') : 'rgba(245,240,232,0.95)', border: `1px solid ${solidHeader ? (darkMode ? '#3A3F32' : '#C8BCA8') : 'rgba(245,240,232,0.3)'}`, borderRadius: '2px' }}>
              <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-xs`} />
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(v => !v)} className="flex items-center gap-2 px-3 py-1.5 text-sm transition-all" style={{ background: '#2D4A22', color: '#F5F0E8', borderRadius: '2px', fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, sans-serif" : "'Noto Serif Arabic', sans-serif" }}>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <i className="fa-solid fa-chevron-down text-[9px] opacity-70" />
                </button>
                {userMenu && (
                  <div className="absolute top-full mt-1.5 w-44 card shadow-xl p-1.5 animate-fade-up" style={{ left: language === 'ar' ? 0 : 'auto', right: language === 'en' ? 0 : 'auto' }}>
                    <Link to={`/${user.role}`} className="flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-none" style={{ color: darkMode ? '#FFF8EA' : '#3A3A2E' }}>
                      <i className="fa-solid fa-gauge text-xs opacity-60" /> {t('dashboard')}
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-none" style={{ color: '#C05040' }}>
                      <i className="fa-solid fa-right-from-bracket text-xs opacity-60" /> {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary text-sm py-2 px-5">{t('login')}</Link>
            )}

            <button onClick={() => setMobileOpen(v => !v)} className="xl:hidden w-8 h-8 flex items-center justify-center transition-all" style={{ color: solidHeader ? (darkMode ? '#C8A96E' : '#2D4A22') : '#F5F0E8' }}>
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-sm`} />
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-40 top-16">
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,20,0.6)' }} onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 w-72 shadow-2xl flex flex-col animate-slide-left" style={{ [language === 'ar' ? 'right' : 'left']: 0, background: darkMode ? '#0F130C' : '#F5F0E8', borderInlineStart: `1px solid ${darkMode ? '#2A2E24' : '#DDD3C2'}` }}>
            <div className="p-6 border-b" style={{ borderColor: darkMode ? '#2A2E24' : '#DDD3C2' }}>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C8A96E' }}>{t('main_menu')}</div>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {NAV.map(link => (
                <Link key={link.path} to={link.path} className="flex items-center px-4 py-3 text-sm font-medium transition-all border-r-2" style={{ color: isActive(link.path) ? (darkMode ? '#C8A96E' : '#2D4A22') : (darkMode ? '#FFF8EA' : '#3A3A2E'), borderColor: isActive(link.path) ? '#C8A96E' : 'transparent', background: isActive(link.path) ? 'rgba(200,169,110,0.1)' : 'transparent', fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, sans-serif" : "'Noto Serif Arabic', sans-serif" }}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t flex gap-2" style={{ borderColor: darkMode ? '#2A2E24' : '#DDD3C2' }}>
              <button onClick={toggleLang} className="flex-1 py-2 text-xs font-semibold tracking-widest" style={{ border: `1px solid ${darkMode ? '#3A3F32' : '#C8BCA8'}`, borderRadius: '2px', color: darkMode ? '#FFF8EA' : '#3A3A2E' }}>{language === 'ar' ? 'English' : 'العربية'}</button>
              <button onClick={toggleDark} className="w-10 h-9 flex items-center justify-center" style={{ border: `1px solid ${darkMode ? '#3A3F32' : '#C8BCA8'}`, borderRadius: '2px', color: darkMode ? '#C8A96E' : '#2D4A22' }}>
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
