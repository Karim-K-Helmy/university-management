import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const HeroSection = () => {
  const { admissionsOpen, addToast, t, language } = useApp();
  const isEnglish = language === 'en';
  const lines = [t('hero_line_1'), t('hero_line_2'), t('hero_line_3')];
  const [lineIdx, setLineIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setLineIdx(i => (i + 1) % lines.length); setShow(true); }, 500);
    }, 3500);
    return () => clearInterval(t);
  }, [lines.length]);

  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-24 pt-24 overflow-hidden" style={{ background: '#0F130C' }}>

      {/* BG image with real overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/images/campus-main.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          style={{ filter: 'sepia(20%) contrast(110%)' }}
        />
        {/* Grain texture overlay — very human touch */}
        <div className="absolute inset-0" style={{
          background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          opacity: 0.4,
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3" style={{ background: 'linear-gradient(to top, #0F130C 20%, transparent)' }} />
        {/* Warm light leak from upper left */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20" style={{ background: 'radial-gradient(circle, #C8A96E, transparent 70%)' }} />
      </div>

      {/* Content — intentionally left-heavy / asymmetric */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className={isEnglish ? 'max-w-3xl' : 'max-w-2xl'} style={isEnglish ? { transform: 'translateY(24px)' } : undefined}>

          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8" style={{ background: '#C8A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C8A96E', letterSpacing: '0.18em', fontFamily: "'JetBrains Mono', monospace" }}>
              {t('semester')}
            </span>
          </div>

          {/* Animated headline */}
          <h1 style={{
            fontFamily: isEnglish ? "Georgia, 'Times New Roman', serif" : "'Noto Serif Arabic', Georgia, serif",
            fontSize: isEnglish ? 'clamp(2.45rem, 5.2vw, 4.75rem)' : 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 700,
            lineHeight: isEnglish ? 1.03 : 1.08,
            letterSpacing: isEnglish ? '-0.045em' : '-0.02em',
            color: '#F5F0E8',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(-8px)',
          }}>
            {lines[lineIdx]}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: 'rgba(245,240,232,0.78)', fontFamily: isEnglish ? "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" : "'Noto Serif Arabic', serif", maxWidth: isEnglish ? '620px' : '520px', fontWeight: 400 }}>
            {language === 'ar' ? <>انضم لأكثر من{' '}<strong style={{ color: '#C8A96E', fontWeight: 600 }}>12,500 طالب</strong>{' '}يبنون مستقبلهم في إحدى أبرز جامعات المنطقة</> : <>Join more than{' '}<strong style={{ color: '#C8A96E', fontWeight: 600 }}>12,500 students</strong>{' '}building their future at one of the region’s leading universities</>}
          </p>

          {/* Buttons — no rounded corners, very intentional */}
          <div className="flex flex-wrap gap-3 mt-10">
            <a href="#programs" className="btn-gold text-sm">
              {t('explore_programs')}
            </a>
            {admissionsOpen ? (
              <Link to="/admissions/apply" className="text-sm px-6 py-3 font-semibold transition-all duration-200"
                style={{ border: '1.5px solid rgba(245,240,232,0.3)', color: '#F5F0E8', borderRadius: '2px' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,240,232,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                {t('apply_now')}
              </Link>
            ) : (
              <button onClick={() => addToast(t('admissions_closed_toast'), 'warning')}
                className="text-sm px-6 py-3 font-semibold"
                style={{ border: '1.5px solid rgba(245,240,232,0.15)', color: 'rgba(245,240,232,0.35)', borderRadius: '2px', cursor: 'not-allowed' }}>
                {t('admissions_closed_btn')}
              </button>
            )}
          </div>

          {/* Stats — minimal, not flashy */}
          <div className="flex flex-wrap gap-8 mt-14" style={{ borderTop: '1px solid rgba(245,240,232,0.1)', paddingTop: '1.5rem' }}>
            {[['12,500+', t('student_label')], ['350+', t('professor_label')], ['48', t('major_label')]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold" style={{ color: '#C8A96E', fontFamily: "'Noto Serif Arabic', Georgia, serif" }}>{v}</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.62)', letterSpacing: isEnglish ? '0.08em' : '0.05em', textTransform: isEnglish ? 'uppercase' : 'none' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 animate-float" style={{ background: '#C8A96E' }} />
      </div>
    </section>
  );
};

export default HeroSection;
