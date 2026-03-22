import React from 'react';

const FEATURES = [
  { num: '01', title: 'اعتماد دولي معترف به', desc: 'حاصلون على الاعتماد من المنظمة العربية لضمان جودة التعليم والمنظمات الدولية.' },
  { num: '02', title: 'مختبرات من الجيل التالي', desc: 'أكثر من 30 مختبراً بأحدث التجهيزات والتقنيات التي تفوق ما تجده في الصناعة.' },
  { num: '03', title: 'شبكة شراكات واسعة', desc: '180+ شركة شريكة توفر فرص التدريب والتوظيف المباشر لخريجينا.' },
  { num: '04', title: 'أعضاء تدريس من النخبة', desc: '350+ أستاذ متميز، معظمهم من خريجي أفضل جامعات العالم وأصحاب خبرة صناعية.' },
  { num: '05', title: 'توظيف ٩٢٪ من الخريجين', desc: 'معظم خريجينا يحصلون على فرصة عمل قبل أو فور التخرج بفضل شبكتنا القوية.' },
  { num: '06', title: 'بيئة تعليمية هجينة', desc: 'دمج مدروس بين الحضور المباشر والتعليم الإلكتروني لأقصى مرونة وكفاءة.' },
];

const WhyUs = () => (
  <section style={{ background: 'white', borderBottom: '1px solid #DDD3C2' }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      {/* Asymmetric header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
        <div>
          <div className="section-tag">لماذا نحن؟</div>
          <h2 className="section-title">ما يجعلنا<br /><em style={{ fontStyle: 'italic', color: '#C8A96E' }}>مختلفين</em></h2>
        </div>
        <p className="md:max-w-xs text-sm leading-relaxed" style={{ color: '#8A8A7A' }}>
          لا نؤمن بالتعليم التقليدي. نؤمن بتجربة تعليمية تُحضّرك لواقع سوق العمل وليس لامتحان.
        </p>
      </div>

      {/* Grid — intentionally not perfect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#DDD3C2' }}>
        {FEATURES.map((f, i) => (
          <div key={i} className="p-8 group transition-all duration-300 cursor-default"
            style={{ background: 'white' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F5F0E8'}
            onMouseLeave={e => e.currentTarget.style.background = 'white'}>
            <div className="text-xs font-bold mb-5 tracking-widest" style={{ color: '#C8A96E', fontFamily: "'JetBrains Mono', monospace" }}>{f.num}</div>
            <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "'Noto Serif Arabic', serif", color: '#1A1A14', lineHeight: 1.3 }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8A8A7A' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
