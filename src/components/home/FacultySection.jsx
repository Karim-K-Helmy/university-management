import React from 'react';
import { FACULTY } from '../../data/mockData';

const FacultySection = () => (
  <section style={{ background: '#F5F0E8', borderBottom: '1px solid #DDD3C2' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
        <div>
          <div className="section-tag">كوادرنا</div>
          <h2 className="section-title">هيئة التدريس</h2>
        </div>
        <p className="md:max-w-xs text-sm" style={{ color: '#8A8A7A' }}>أكاديميون من نخبة الجامعات العالمية يجمعون بين البحث والخبرة الصناعية</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#DDD3C2' }}>
        {FACULTY.map(m => (
          <div key={m.id} className="p-6 group transition-all duration-300"
            style={{ background: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F0E8'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}>
            <img src={m.image} alt={m.name} className="w-16 h-16 mb-5 object-cover" style={{ borderRadius: '2px', filter: 'grayscale(20%)' }} />
            <h3 className="font-bold mb-0.5" style={{ fontFamily: "'Noto Serif Arabic', serif", color: '#1A1A14', fontSize: '1rem' }}>{m.name}</h3>
            <p className="text-xs mb-0.5 font-semibold" style={{ color: '#2D4A22' }}>{m.title}</p>
            <p className="text-xs mb-3" style={{ color: '#A0A090' }}>{m.department}</p>
            <a href={`mailto:${m.email}`} className="text-xs transition-colors"
              style={{ color: '#C8A96E', fontFamily: "'JetBrains Mono', monospace" }}
              onMouseEnter={e => e.currentTarget.style.color = '#2D4A22'}
              onMouseLeave={e => e.currentTarget.style.color = '#C8A96E'}>
              {m.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FacultySection;
