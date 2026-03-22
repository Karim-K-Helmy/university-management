import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { value: 12500, label: 'طالب مسجّل',         suffix: '+' },
  { value: 350,   label: 'عضو هيئة تدريس',     suffix: '+' },
  { value: 48,    label: 'برنامج أكاديمي',      suffix: '' },
  { value: 92,    label: 'نسبة توظيف الخريجين', suffix: '%' },
  { value: 180,   label: 'شركة شريكة',          suffix: '+' },
  { value: 2400,  label: 'منحة دراسية مُقدَّمة', suffix: '+' },
];

const useCountUp = (end, started) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(e * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, started]);
  return v;
};

const StatItem = ({ stat, started, i }) => {
  const v = useCountUp(stat.value, started);
  return (
    <div className="text-center py-8 px-4 group" style={{ animationDelay: `${i * 0.08}s` }}>
      <div className="text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300 group-hover:text-gold"
        style={{ fontFamily: "'Noto Serif Arabic', Georgia, serif", color: '#2D4A22', letterSpacing: '-0.02em' }}>
        {v.toLocaleString('ar-EG')}{stat.suffix}
      </div>
      <div className="text-sm" style={{ color: '#8A8A7A', letterSpacing: '0.03em' }}>{stat.label}</div>
    </div>
  );
};

const StatsBar = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#F0E6D0', borderTop: '1px solid #DDD3C2', borderBottom: '1px solid #DDD3C2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="py-10 text-center">
          <div className="section-tag">أرقام تتحدث عن نفسها</div>
          <h2 className="section-title dark:text-ink" style={{ color: '#1A1A14' }}>الجامعة في أرقام</h2>
        </div>
        {/* Grid with vertical dividers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 pb-4"
          style={{ borderTop: '1px solid #DDD3C2' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < STATS.length - 1 ? '1px solid #DDD3C2' : 'none' }}>
              <StatItem stat={s} started={started} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
