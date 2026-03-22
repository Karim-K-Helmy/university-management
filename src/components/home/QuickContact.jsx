import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const QuickContact = () => {
  const { addToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { addToast('يرجى ملء جميع الحقول', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    addToast('تم إرسال رسالتك، سنتواصل معك قريباً', 'success');
    setForm({ name: '', email: '', message: '' });
    setLoading(false);
  };

  return (
    <section style={{ background: 'white', borderBottom: '1px solid #DDD3C2' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="section-tag">تواصل معنا</div>
            <h2 className="section-title mb-6">نحن هنا<br /><em style={{ fontStyle: 'italic', color: '#C8A96E' }}>لمساعدتك</em></h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#8A8A7A', maxWidth: '380px' }}>
              سواء كان سؤالاً عن برامجنا أو تحتاج مساعدة في عملية التقديم، فريقنا متاح من الأحد إلى الخميس.
            </p>
            <div className="space-y-5">
              {[
                { label: 'الهاتف', value: '+966 11 123 4567', icon: 'fa-phone' },
                { label: 'البريد', value: 'info@futureuni.edu', icon: 'fa-envelope' },
                { label: 'العنوان', value: 'الرياض، حي الملك فهد', icon: 'fa-location-dot' },
                { label: 'مواعيد العمل', value: 'الأحد – الخميس، 8 صباحاً – 4 مساءً', icon: 'fa-clock' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-4">
                  <i className={`fa-solid ${icon} text-sm mt-0.5 flex-shrink-0`} style={{ color: '#2D4A22', width: '16px' }} />
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: '#A0A090' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: '#3A3A2E' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handle} className="space-y-4" style={{ borderRight: '1px solid #DDD3C2', paddingRight: '3rem' }}>
            <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "'Noto Serif Arabic', serif", color: '#1A1A14' }}>أرسل رسالة</h3>
            <div>
              <label className="input-label">الاسم الكامل</label>
              <input className="input-field" placeholder="محمد الأحمدي" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="input-label">البريد الإلكتروني</label>
              <input type="email" className="input-field" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="input-label">الرسالة</label>
              <textarea className="input-field resize-none" rows={5} placeholder="كيف يمكننا مساعدتك؟" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <><i className="fa-solid fa-spinner fa-spin" /> جاري الإرسال...</> : 'إرسال الرسالة'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;
