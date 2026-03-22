import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NEWS } from '../../data/mockData';

const NewsSlider = () => {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef();

  const next = () => setCur(i => (i + 1) % NEWS.length);
  const prev = () => setCur(i => (i - 1 + NEWS.length) % NEWS.length);

  useEffect(() => {
    if (!paused) { timer.current = setInterval(next, 4500); }
    return () => clearInterval(timer.current);
  }, [paused, cur]);

  return (
    <section style={{ background: 'white', borderBottom: '1px solid #DDD3C2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-tag">ما الجديد؟</div>
            <h2 className="section-title">أخبار وفعاليات</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-10 h-10 flex items-center justify-center transition-all"
              style={{ border: '1px solid #DDD3C2', borderRadius: '2px', color: '#5C5C4E' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2D4A22'; e.currentTarget.style.color = '#F5F0E8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5C5C4E'; }}>
              <i className="fa-solid fa-chevron-right text-xs" />
            </button>
            <button onClick={next} className="w-10 h-10 flex items-center justify-center transition-all"
              style={{ border: '1px solid #DDD3C2', borderRadius: '2px', color: '#5C5C4E' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2D4A22'; e.currentTarget.style.color = '#F5F0E8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5C5C4E'; }}>
              <i className="fa-solid fa-chevron-left text-xs" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${cur * 100}%)` }}>
            {NEWS.map(item => (
              <div key={item.id} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-5" style={{ border: '1px solid #DDD3C2' }}>
                <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: 300 }}>
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4">
                    <span className="badge-forest text-xs">{item.category}</span>
                  </div>
                </div>
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center" style={{ background: '#F5F0E8' }}>
                  <p className="text-xs mb-4" style={{ color: '#A0A090', fontFamily: "'JetBrains Mono', monospace" }}>
                    {new Date(item.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 leading-snug" style={{ fontFamily: "'Noto Serif Arabic', Georgia, serif", color: '#1A1A14' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#5C5C4E' }}>{item.excerpt}</p>
                  <Link to={`/news/${item.id}`} className="btn-primary self-start text-sm">
                    اقرأ المزيد
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-6">
          {NEWS.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className="transition-all duration-300"
              style={{
                width: i === cur ? '24px' : '6px',
                height: '6px',
                background: i === cur ? '#2D4A22' : '#DDD3C2',
                borderRadius: '99px',
              }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;
