import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: '#F5F0E8' }}>
    <div className="mb-8">
      <p className="text-xs font-semibold tracking-widest uppercase mb-6"
        style={{ color: '#C8A96E', letterSpacing: '0.18em', fontFamily: "'JetBrains Mono', monospace" }}>
        خطأ 404
      </p>
      <h1 className="text-6xl md:text-8xl font-bold mb-4"
        style={{ fontFamily: "'Noto Serif Arabic', Georgia, serif", color: '#1A1A14', letterSpacing: '-0.03em' }}>
        الصفحة غير موجودة
      </h1>
      <p className="text-base mb-10 max-w-md mx-auto" style={{ color: '#8A8A7A' }}>
        يبدو أن الصفحة التي تبحث عنها قد انتقلت أو غير موجودة. تحقق من الرابط أو ابدأ من هنا:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="btn-primary text-sm">الصفحة الرئيسية</Link>
        <Link to="/programs" className="btn-outline text-sm">البرامج الأكاديمية</Link>
        <Link to="/contact" className="btn-outline text-sm">تواصل معنا</Link>
      </div>
    </div>
    <div className="mt-12 text-xs" style={{ color: '#DDD3C2', fontFamily: "'JetBrains Mono', monospace" }}>
      جامعة المستقبل — 404
    </div>
  </div>
);

export default NotFoundPage;
