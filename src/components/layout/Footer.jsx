import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    if (!email.includes('@')) { addToast('بريد إلكتروني غير صحيح', 'error'); return; }
    setModal(true); setEmail('');
  };

  return (
    <footer style={{ background: '#1A1A14', color: '#8A8A7A', borderTop: '1px solid #2A2A1E' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Newsletter band */}
        <div className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{ borderBottom: '1px solid #2A2A1E' }}>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: '#C8A96E', letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace" }}>
              النشرة البريدية
            </p>
            <p className="text-sm" style={{ color: '#6A6A5A' }}>كن أول من يعرف عن أخبار القبول والفرص الجديدة</p>
          </div>
          <form onSubmit={handle} className="flex gap-0" style={{ maxWidth: '380px', width: '100%' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="بريدك الإلكتروني"
              className="flex-1 px-4 py-2.5 text-sm outline-none"
              style={{ background: '#2A2A1E', border: '1px solid #3A3A2E', borderRadius: '2px 0 0 2px', color: '#E8E2D8', fontFamily: "'Noto Serif Arabic', sans-serif" }} />
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold flex-shrink-0"
              style={{ background: '#C8A96E', color: '#1A1A14', borderRadius: '0 2px 2px 0', border: 'none' }}>
              اشترك
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14" style={{ borderBottom: '1px solid #2A2A1E' }}>
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#2D4A22', borderRadius: '2px' }}>
                <i className="fa-solid fa-graduation-cap text-sm" style={{ color: '#C8A96E' }} />
              </div>
              <span className="font-bold text-sm" style={{ color: '#E8E2D8', fontFamily: "'Noto Serif Arabic', serif" }}>جامعة المستقبل</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#6A6A5A' }}>نبني قادة المستقبل من خلال التعليم المتميز والبحث العلمي الرائد.</p>
            <div className="flex gap-3">
              {['fa-facebook-f','fa-x-twitter','fa-instagram','fa-linkedin-in'].map(icon => (
                <a key={icon} href="#!" className="w-8 h-8 flex items-center justify-center transition-all"
                  style={{ border: '1px solid #2A2A1E', borderRadius: '2px', color: '#6A6A5A' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2D4A22'; e.currentTarget.style.color = '#C8A96E'; e.currentTarget.style.borderColor = '#2D4A22'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6A6A5A'; e.currentTarget.style.borderColor = '#2A2A1E'; }}>
                  <i className={`fa-brands ${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'روابط سريعة', links: [['الرئيسية','/'],['عن الجامعة','/about'],['البرامج الأكاديمية','/programs'],['بوابة التقديم','/admissions/apply'],['بوابة الطالب','/student']] },
            { title: 'الدعم', links: [['الأسئلة الشائعة','#'],['دليل الطالب','#'],['خدمات القبول','/admissions/status'],['التواصل مع الإدارة','/contact']] },
            { title: 'الاعتمادات', links: [['المنظمة العربية لضمان الجودة','#'],['اتحاد الجامعات العربية','#'],['ISO 9001:2015','#']] },
          ].map(col => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#C8A96E', letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace" }}>{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, path]) => (
                  <li key={label}>
                    <Link to={path} className="text-sm transition-colors"
                      style={{ color: '#6A6A5A' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#E8E2D8'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6A6A5A'}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: '#4A4A3A' }}>
          <span>© 2024 جامعة المستقبل. جميع الحقوق محفوظة.</span>
          <div className="flex gap-5">
            {[['سياسة الخصوصية','/privacy'],['الشروط والأحكام','/terms'],['خريطة الموقع','/sitemap']].map(([l,p]) => (
              <Link key={l} to={p} className="transition-colors"
                onMouseEnter={e => e.currentTarget.style.color = '#8A8A7A'}
                onMouseLeave={e => e.currentTarget.style.color = '#4A4A3A'}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} size="sm">
        <div className="text-center py-2">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(45,74,34,0.1)', borderRadius: '2px' }}>
            <i className="fa-solid fa-envelope-circle-check text-2xl" style={{ color: '#2D4A22' }} />
          </div>
          <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>تم الاشتراك بنجاح</h3>
          <p className="text-sm mb-5" style={{ color: '#8A8A7A' }}>يرجى تفعيل الاشتراك من بريدك الإلكتروني.</p>
          <button onClick={() => setModal(false)} className="btn-primary w-full justify-center text-sm">حسناً</button>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
