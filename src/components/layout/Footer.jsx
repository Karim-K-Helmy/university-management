import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { addToast, language, t } = useApp();
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    if (!email.includes('@')) { addToast(t('بريد إلكتروني غير صحيح'), 'error'); return; }
    setModal(true); setEmail('');
  };

  const columns = [
    { title: t('quick_links'), links: [[t('home'),'/'],[t('about'),'/about'],[t('programs'),'/programs'],[t('admissions'),'/admissions/apply'],[t('student_dashboard'),'/student']] },
    { title: t('support'), links: [[t('faq'),'/faq'],[t('student_guide'),'/student-guide'],[t('admissions_services'),'/admissions/services'],[t('contact_admin'),'/contact-admin']] },
    { title: t('accreditations'), links: [[language === 'ar' ? 'المنظمة العربية لضمان الجودة' : 'Arab Organization for Quality Assurance','/about'],[language === 'ar' ? 'اتحاد الجامعات العربية' : 'Association of Arab Universities','/about'],['ISO 9001:2015','/about']] },
  ];

  return (
    <footer style={{ background: '#1A1A14', color: '#D8CCB8', borderTop: '1px solid #2A2A1E' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6" style={{ borderBottom: '1px solid #2A2A1E' }}>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#C8A96E', letterSpacing: '0.15em', fontFamily: "'JetBrains Mono', monospace" }}>
              {t('newsletter')}
            </p>
            <p className="text-sm" style={{ color: '#D8CCB8' }}>{t('newsletter_text')}</p>
          </div>
          <form onSubmit={handle} className="flex gap-0" style={{ maxWidth: '380px', width: '100%' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
              className="flex-1 px-4 py-2.5 text-sm outline-none"
              style={{ background: '#2A2A1E', border: '1px solid #3A3A2E', borderRadius: language === 'ar' ? '2px 0 0 2px' : '2px 0 0 2px', color: '#FFF8EA', fontFamily: "'Noto Serif Arabic', sans-serif" }} />
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold flex-shrink-0" style={{ background: '#C8A96E', color: '#1A1A14', borderRadius: language === 'ar' ? '0 2px 2px 0' : '0 2px 2px 0', border: 'none' }}>
              {t('subscribe')}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14" style={{ borderBottom: '1px solid #2A2A1E' }}>
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: '#2D4A22', borderRadius: '2px' }}>
                <i className="fa-solid fa-graduation-cap text-sm" style={{ color: '#C8A96E' }} />
              </div>
              <span className="font-bold text-sm" style={{ color: '#FFF8EA', fontFamily: "'Noto Serif Arabic', serif" }}>{t('future_uni')}</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#D8CCB8' }}>{language === 'ar' ? 'نبني قادة المستقبل من خلال التعليم المتميز والبحث العلمي الرائد.' : 'We build future leaders through excellent education and pioneering research.'}</p>
            <div className="flex gap-3">
              {['fa-facebook-f','fa-x-twitter','fa-instagram','fa-linkedin-in'].map(icon => (
                <a key={icon} href="#!" aria-label={icon} className="w-8 h-8 flex items-center justify-center transition-all footer-social">
                  <i className={`fa-brands ${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C8A96E', letterSpacing: '0.12em', fontFamily: "'JetBrains Mono', monospace" }}>{col.title}</p>
              <ul className="space-y-2">
                {col.links.map(([label, path]) => (
                  <li key={label}>
                    <Link to={path} className="text-sm footer-link transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: '#AFA38F' }}>
          <span>{t('copyright')}</span>
          <div className="flex gap-5">
            {[[t('privacy'),'/privacy'],[t('terms'),'/terms'],[t('sitemap'),'/sitemap']].map(([l,p]) => (
              <Link key={l} to={p} className="footer-link transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} size="sm">
        <div className="text-center py-2">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(45,74,34,0.1)', borderRadius: '2px' }}>
            <i className="fa-solid fa-envelope-circle-check text-2xl" style={{ color: '#2D4A22' }} />
          </div>
          <h3 className="font-bold mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{language === 'ar' ? 'تم الاشتراك بنجاح' : 'Subscribed successfully'}</h3>
          <p className="text-sm mb-5" style={{ color: '#5C5C4E' }}>{language === 'ar' ? 'يرجى تفعيل الاشتراك من بريدك الإلكتروني.' : 'Please confirm your subscription from your email.'}</p>
          <button onClick={() => setModal(false)} className="btn-primary w-full justify-center text-sm">{language === 'ar' ? 'حسناً' : 'OK'}</button>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
