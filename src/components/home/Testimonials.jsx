import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/mockData';

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];
  return (
    <section style={{ background: '#2D4A22' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-tag" style={{ color: '#C8A96E' }}>ماذا يقولون؟</div>
            <h2 className="section-title" style={{ color: '#F5F0E8' }}>آراء<br /><em style={{ fontStyle: 'italic', color: '#C8A96E' }}>طلابنا</em></h2>
            <div className="flex gap-3 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className="transition-all duration-300"
                  style={{ width: i === active ? '32px' : '8px', height: '8px', background: i === active ? '#C8A96E' : 'rgba(200,169,110,0.3)', borderRadius: '99px' }} />
              ))}
            </div>
          </div>
          <div style={{ borderRight: '2px solid rgba(200,169,110,0.3)', paddingRight: '3rem' }}>
            <p className="text-4xl font-bold mb-6" style={{ color: 'rgba(200,169,110,0.3)', fontFamily: "'DM Serif Display', serif" }}>"</p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(245,240,232,0.85)', fontFamily: "'Noto Serif Arabic', serif", fontWeight: 400 }}>
              {t.text}
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12" style={{ borderRadius: '2px' }} />
              <div>
                <p className="font-semibold" style={{ color: '#F5F0E8', fontFamily: "'Noto Serif Arabic', serif" }}>{t.name}</p>
                <p className="text-xs" style={{ color: '#C8A96E', letterSpacing: '0.05em' }}>{t.program} · {t.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
