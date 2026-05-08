import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supportPages } from '../../data/translations';
import { useApp } from '../../context/AppContext';

const PageShell = ({ eyebrow, title, subtitle, children }) => (
  <div className="pt-24 pb-16 min-h-screen support-page">
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <span className="section-tag justify-center">{eyebrow}</span>
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

export const FaqPage = () => {
  const { language } = useApp();
  const page = supportPages[language].faq;
  const [open, setOpen] = useState(0);
  return (
    <PageShell {...page}>
      <div className="max-w-3xl mx-auto space-y-3">
        {page.items.map((item, index) => (
          <div key={item.q} className="support-card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === index ? -1 : index)}
              className="w-full flex items-center justify-between gap-4 p-5 text-start"
            >
              <span className="font-bold text-lg support-title">{item.q}</span>
              <i className={`fa-solid fa-chevron-down support-icon transition-transform ${open === index ? 'rotate-180' : ''}`} />
            </button>
            {open === index && (
              <div className="px-5 pb-5 support-muted leading-relaxed border-t border-subtle pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export const StudentGuidePage = () => {
  const { language } = useApp();
  const page = supportPages[language].guide;
  return (
    <PageShell {...page}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {page.cards.map(card => (
          <div key={card.title} className="support-card p-6 h-full">
            <div className="support-icon-box mb-5"><i className={`fa-solid ${card.icon}`} /></div>
            <h2 className="support-title text-xl font-black mb-3">{card.title}</h2>
            <p className="support-muted leading-relaxed text-sm">{card.text}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export const ContactAdminPage = () => {
  const { language, addToast, t } = useApp();
  const page = supportPages[language].contact;
  const [form, setForm] = useState({ name: '', email: '', dept: page.departments[0].title, message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setForm({ name: '', email: '', dept: page.departments[0].title, message: '' });
    addToast(language === 'ar' ? 'تم إرسال رسالتك إلى الإدارة بنجاح' : 'Your message has been sent to administration', 'success');
  };

  return (
    <PageShell {...page}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {page.departments.map(dept => (
          <a key={dept.email} href={`mailto:${dept.email}`} className="support-card p-6 block hover:-translate-y-1 transition-transform">
           <div className="support-icon-box mb-4">
  <i className={`fa-solid ${dept.icon}`}></i>
</div>
            <h2 className="support-title font-black text-xl mb-2">{dept.title}</h2>
            <p className="support-muted text-sm leading-relaxed mb-3">{dept.text}</p>
            <span className="support-link" dir="ltr">{dept.email}</span>
          </a>
        ))}
      </div>

      <form onSubmit={submit} className="support-card p-6 md:p-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="input-label">{t('full_name')}</label>
            <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="input-label">{t('email')}</label>
            <input type="email" className="input-field" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
        </div>
        <div className="mb-4">
          <label className="input-label">{language === 'ar' ? 'القسم' : 'Department'}</label>
          <select className="input-field" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))}>
            {page.departments.map(dept => <option key={dept.title} value={dept.title}>{dept.title}</option>)}
          </select>
        </div>
        <div className="mb-5">
          <label className="input-label">{t('message')}</label>
          <textarea className="input-field resize-none" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? <><i className="fa-solid fa-spinner fa-spin" /> {t('loading')}</> : <><i className="fa-solid fa-paper-plane" /> {t('send_message')}</>}
        </button>
      </form>
    </PageShell>
  );
};

export const AdmissionsServicesPage = () => {
  const { language } = useApp();
  const page = supportPages[language].services;
  return (
    <PageShell {...page}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {page.services.map(service => (
          <Link key={service.title} to={service.link} className="admission-service-card p-6 flex gap-5 items-start group">
            <div className="support-icon-box flex-shrink-0"><i className={`fa-solid ${service.icon}`} /></div>
            <div>
              <h2 className="support-title text-xl font-black mb-2 group-hover:underline">{service.title}</h2>
              <p className="support-muted leading-relaxed text-sm">{service.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
};
