import React from 'react';
import { Link } from 'react-router-dom';
import { PROGRAMS } from '../../data/mockData';

const COLLEGE_COLORS = {
  'كلية الهندسة': '#3D6130',
  'كلية الحاسبات': '#3A4A52',
  'كلية إدارة الأعمال': '#6B4A2A',
};

const Card = ({ p, large }) => (
  <Link
    to={`/programs/${p.id}`}
    className="relative overflow-hidden block group"
    style={{ minHeight: large ? 380 : 200, background: '#1A1A14', borderRadius: '0' }}
  >
    <img src={p.image} alt={p.title}
      className="absolute inset-0 w-full h-full object-cover opacity-50 transition-all duration-700 group-hover:opacity-40 group-hover:scale-105" />

    {/* Colored accent bar at top */}
    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: COLLEGE_COLORS[p.college] || '#C8A96E' }} />

    <div className="absolute inset-0 p-6 flex flex-col justify-between">
      <div>
        <span className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(200,169,110,0.8)', letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace" }}>
          {p.college}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-white mb-2 transition-all duration-300 group-hover:translate-x-1"
          style={{ fontFamily: "'Noto Serif Arabic', Georgia, serif", fontSize: large ? '1.6rem' : '1.1rem', lineHeight: 1.2 }}>
          {p.title}
        </h3>
        {large && <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(245,240,232,0.6)' }}>{p.description}</p>}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: 'rgba(245,240,232,0.45)' }}>{p.duration} · {p.mode}</span>
          <span className="text-xs font-semibold transition-all duration-300 group-hover:gap-3"
            style={{ color: '#C8A96E', display: 'flex', alignItems: 'center', gap: '6px' }}>
            تفاصيل <span style={{ transition: 'transform 0.2s' }} className="group-hover:translate-x-1 inline-block">←</span>
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const ProgramsBento = () => (
  <section id="programs" style={{ background: '#F5F0E8', borderBottom: '1px solid #DDD3C2' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      <div className="mb-12">
        <div className="section-tag">اكتشف مسارك</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="section-title">البرامج الأكاديمية</h2>
          <Link to="/programs" className="btn-outline text-sm self-start md:self-auto">
            جميع البرامج ←
          </Link>
        </div>
      </div>

      {/* Bento — gap treated as border color for grid separation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: '#DDD3C2' }}>
        {/* Large card */}
        <div className="md:col-span-2 md:row-span-2"><Card p={PROGRAMS[0]} large /></div>
        {/* 4 small cards */}
        <div><Card p={PROGRAMS[1]} /></div>
        <div><Card p={PROGRAMS[2]} /></div>
        <div><Card p={PROGRAMS[3]} /></div>
        <div><Card p={PROGRAMS[4]} /></div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-px" style={{ background: '#DDD3C2' }}>
        <div><Card p={PROGRAMS[5]} /></div>
        <div className="md:col-span-2 p-10 flex flex-col justify-center" style={{ background: '#2D4A22' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#C8A96E', letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace" }}>
            لم تجد ما يناسبك؟
          </p>
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>
            لدينا 48 برنامجاً متنوعاً
          </h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(245,240,232,0.6)' }}>استكشف الكتالوج الكامل واعثر على البرنامج الأنسب لطموحاتك.</p>
          <Link to="/programs" className="btn-gold self-start text-sm">عرض جميع البرامج</Link>
        </div>
      </div>
    </div>
  </section>
);

export default ProgramsBento;
