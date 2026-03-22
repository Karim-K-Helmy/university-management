import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';

const StudentRequestsPage = () => {
  const { addToast } = useApp();
  const [ifadaType, setIfadaType] = useState('ar');
  const [ifadaCopies, setIfadaCopies] = useState(1);
  const [loadingIfada, setLoadingIfada] = useState(false);
  const [loadingCard, setLoadingCard] = useState(false);
  const [cardPhoto, setCardPhoto] = useState(null);
  const [requests] = useState([
    { id: 1, type: 'إفادة قيد', date: '2024-03-01', status: 'completed' },
    { id: 2, type: 'كارنيه جامعي', date: '2024-02-15', status: 'pending' },
  ]);

  const handleIfada = async (e) => {
    e.preventDefault();
    setLoadingIfada(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoadingIfada(false);
    addToast('تم إرسال طلب الإفادة بنجاح! ستكون جاهزة خلال 3 أيام عمل.', 'success');
  };

  const handleCard = async (e) => {
    e.preventDefault();
    if (!cardPhoto) { addToast('يرجى رفع صورة شخصية حديثة', 'error'); return; }
    setLoadingCard(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoadingCard(false);
    addToast('تم إرسال طلب الكارنيه بنجاح!', 'success');
    setCardPhoto(null);
  };

  const statusMap = {
    completed: { label: 'مكتمل', cls: 'badge-success' },
    pending:   { label: 'قيد التنفيذ', cls: 'badge-warning' },
    rejected:  { label: 'مرفوض', cls: 'badge-danger' },
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">الخدمات الإلكترونية</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ifada Form */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center">
                <i className="fa-solid fa-file-lines" />
              </div>
              <div>
                <h2 className="font-black text-gray-900 dark:text-white">طلب إفادة قيد</h2>
                <p className="text-xs text-gray-400">شهادة تثبت تسجيلك في الجامعة</p>
              </div>
            </div>
            <form onSubmit={handleIfada} className="space-y-4">
              <div>
                <label className="input-label">لغة الإفادة</label>
                <div className="flex gap-3">
                  {[['ar','عربي'],['en','إنجليزي']].map(([val,label]) => (
                    <label key={val} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${ifadaType===val ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-dark-border'}`}>
                      <input type="radio" name="lang" value={val} checked={ifadaType===val} onChange={() => setIfadaType(val)} className="hidden" />
                      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="input-label">عدد النسخ</label>
                <select className="input-field" value={ifadaCopies} onChange={e => setIfadaCopies(e.target.value)}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} نسخة</option>)}
                </select>
              </div>
              <button type="submit" disabled={loadingIfada} className="btn-primary w-full justify-center">
                {loadingIfada ? <><i className="fa-solid fa-spinner fa-spin" /> جاري الإرسال...</> : <><i className="fa-solid fa-paper-plane" /> إرسال الطلب</>}
              </button>
            </form>
          </div>

          {/* Card Form */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 flex items-center justify-center">
                <i className="fa-solid fa-id-card" />
              </div>
              <div>
                <h2 className="font-black text-gray-900 dark:text-white">طلب كارنيه جامعي</h2>
                <p className="text-xs text-gray-400">لتجديد أو استبدال الكارنيه</p>
              </div>
            </div>
            <form onSubmit={handleCard} className="space-y-4">
              <div>
                <label className="input-label">سبب الطلب</label>
                <select className="input-field">
                  <option>فقدان الكارنيه</option>
                  <option>تلف الكارنيه</option>
                  <option>تجديد سنوي</option>
                </select>
              </div>
              <div>
                <label className="input-label">صورة شخصية حديثة</label>
                <label className="flex flex-col items-center gap-2 p-5 border-2 border-dashed border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:border-primary-400 transition-colors">
                  {cardPhoto ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <i className="fa-solid fa-check-circle" />
                      <span className="text-sm font-medium">{cardPhoto.name}</span>
                    </div>
                  ) : (
                    <>
                      <i className="fa-solid fa-camera text-3xl text-gray-300" />
                      <span className="text-sm text-gray-400">اضغط لرفع الصورة</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={e => setCardPhoto(e.target.files[0])} />
                </label>
              </div>
              <button type="submit" disabled={loadingCard} className="btn-primary w-full justify-center bg-accent-500 hover:bg-accent-600">
                {loadingCard ? <><i className="fa-solid fa-spinner fa-spin" /> جاري الإرسال...</> : <><i className="fa-solid fa-paper-plane" /> إرسال الطلب</>}
              </button>
            </form>
          </div>
        </div>

        {/* Previous Requests */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-dark-border">
            <h2 className="font-black text-gray-900 dark:text-white">الطلبات السابقة</h2>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>نوع الطلب</th><th>تاريخ الطلب</th><th>الحالة</th><th>إجراء</th></tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id}>
                  <td className="font-semibold text-gray-900 dark:text-white">{r.type}</td>
                  <td>{new Date(r.date).toLocaleDateString('ar-SA')}</td>
                  <td><span className={statusMap[r.status].cls}>{statusMap[r.status].label}</span></td>
                  <td>
                    {r.status === 'completed' && (
                      <button className="text-sm text-primary-600 hover:underline">
                        <i className="fa-solid fa-download ml-1" />تحميل
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentRequestsPage;
