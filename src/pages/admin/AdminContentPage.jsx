import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import { NEWS } from '../../data/mockData';

const AdminContentPage = () => {
  const { addToast } = useApp();
  const [news, setNews] = useState(NEWS);
  const [form, setForm] = useState({ title: '', excerpt: '', category: 'إنجازات', scheduled: '', published: false });
  const [preview, setPreview] = useState(false);

  const handlePublish = () => {
    if (!form.title || !form.excerpt) { addToast('يرجى ملء العنوان والمحتوى', 'error'); return; }
    const newItem = { id: Date.now(), ...form, date: new Date().toISOString().split('T')[0], image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600' };
    setNews(n => [newItem, ...n]);
    setForm({ title: '', excerpt: '', category: 'إنجازات', scheduled: '', published: false });
    addToast('تم نشر الخبر بنجاح', 'success');
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">إدارة المحتوى</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="card p-6 space-y-4">
            <h2 className="font-black text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-pen-to-square text-primary-600" /> نشر خبر جديد
            </h2>
            <div>
              <label className="input-label">عنوان الخبر *</label>
              <input className="input-field" placeholder="عنوان الخبر..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className="input-label">الفئة</label>
              <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {['إنجازات', 'فعاليات', 'شراكات', 'تطوير', 'إعلانات'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">محتوى الخبر *</label>
              <textarea className="input-field resize-none" rows={5} placeholder="اكتب محتوى الخبر هنا..." value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
            </div>
            <div>
              <label className="input-label">جدولة النشر (اختياري)</label>
              <input type="datetime-local" className="input-field" value={form.scheduled} onChange={e => setForm(f => ({ ...f, scheduled: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPreview(v => !v)} className="btn-outline flex-1 text-sm">
                <i className="fa-solid fa-eye ml-1" /> {preview ? 'إخفاء' : 'معاينة'}
              </button>
              <button onClick={handlePublish} className="btn-primary flex-1 text-sm justify-center">
                <i className="fa-solid fa-upload ml-1" /> {form.scheduled ? 'جدولة النشر' : 'نشر الآن'}
              </button>
            </div>

            {/* Preview */}
            {preview && form.title && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-border/30 rounded-xl border border-dashed border-gray-200 dark:border-dark-border">
                <span className="badge-primary text-xs mb-2 inline-block">{form.category}</span>
                <h3 className="font-black text-gray-900 dark:text-white mb-2">{form.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{form.excerpt}</p>
              </div>
            )}
          </div>

          {/* Published News */}
          <div className="card p-5">
            <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-newspaper text-accent-600" /> الأخبار المنشورة ({news.length})
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-hide">
              {news.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors border border-gray-100 dark:border-dark-border">
                  <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="badge-primary text-[10px] mb-1 inline-block">{item.category}</span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <button onClick={() => { setNews(n => n.filter(x => x.id !== item.id)); addToast('تم حذف الخبر', 'success'); }} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <i className="fa-solid fa-trash text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminContentPage;
