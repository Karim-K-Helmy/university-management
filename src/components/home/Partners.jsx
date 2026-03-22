import React from 'react';
import { PARTNERS } from '../../data/mockData';

const Partners = () => (
  <section style={{ background: '#F0E6D0', borderBottom: '1px solid #DDD3C2' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <p className="text-center text-xs font-semibold tracking-widest uppercase mb-10"
        style={{ color: '#A0A090', letterSpacing: '0.18em', fontFamily: "'JetBrains Mono', monospace" }}>
        شركاء النجاح
      </p>
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {PARTNERS.map(p => (
          <img key={p.id} src={p.logo} alt={p.name}
            className="max-h-8 max-w-[100px] object-contain transition-all duration-300 cursor-pointer"
            style={{ opacity: 0.4, filter: 'grayscale(100%)' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'grayscale(0%)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.4'; e.currentTarget.style.filter = 'grayscale(100%)'; }}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
