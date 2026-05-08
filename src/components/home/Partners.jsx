import React from 'react';
import { PARTNERS } from '../../data/mockData';

const Partners = () => (
  <section style={{ background: '#F0E6D0', borderBottom: '1px solid #DDD3C2' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <p className="text-center text-xs font-semibold tracking-widest uppercase mb-10"
        style={{ color: '#5C5C4E', letterSpacing: '0.18em', fontFamily: "'JetBrains Mono', monospace" }}>
        شركاء النجاح
      </p>
      <div className="flex flex-wrap justify-center items-center gap-5 md:gap-7">
        {PARTNERS.map(p => (
          <img key={p.id} src={p.logo} alt={p.name}
            className="h-16 md:h-20 w-36 md:w-44 object-contain rounded-lg bg-white/80 border border-[#DDD3C2] p-2 shadow-sm transition-all duration-300 cursor-pointer"
            style={{ opacity: 1, filter: 'none' }}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
