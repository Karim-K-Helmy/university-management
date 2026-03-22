import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

const COURSES = [
  { id: 1, name: 'تصميم قواعد البيانات', code: 'CS401', students: 38, lectures: 8, assignments: 2 },
  { id: 2, name: 'هندسة البرمجيات المتقدمة', code: 'CS402', students: 32, lectures: 6, assignments: 3 },
  { id: 3, name: 'الذكاء الاصطناعي', code: 'CS403', students: 45, lectures: 10, assignments: 1 },
];

const CONTENT_TYPES = ['محاضرة', 'تكليف', 'إعلان'];

const InstructorCoursesPage = () => {
  const { addToast } = useApp();
  const [addModal, setAddModal] = useState(false);
  const [contentType, setContentType] = useState('محاضرة');
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) { addToast('يرجى إدخال العنوان', 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setAddModal(false);
    addToast(`تم إضافة ${contentType} "${title}" بنجاح`, 'success');
    setTitle(''); setFiles([]); setDueDate('');
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const dropped = Array.from(e.dataTransfer?.files || e.target.files || []);
    setFiles(prev => [...prev, ...dropped]);
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">إدارة المقررات</h1>
          <button onClick={() => setAddModal(true)} className="btn-primary text-sm">
            <i className="fa-solid fa-plus" /> إضافة محتوى
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COURSES.map(c => (
            <div key={c.id} className="card-hover p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-glow">
                  <i className="fa-solid fa-book-open" />
                </div>
                <span className="badge-primary text-xs">{c.code}</span>
              </div>
              <h3 className="font-black text-gray-900 dark:text-white mb-1">{c.name}</h3>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                {[['fa-users', c.students, 'طالب'], ['fa-play', c.lectures, 'محاضرة'], ['fa-tasks', c.assignments, 'تكليف']].map(([icon, val, label]) => (
                  <div key={label} className="bg-gray-50 dark:bg-dark-border/30 rounded-xl py-2">
                    <i className={`fa-solid ${icon} text-primary-500 text-xs block mb-0.5`} />
                    <p className="font-black text-gray-900 dark:text-white text-sm">{val}</p>
                    <p className="text-[10px] text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setAddModal(true)} className="btn-ghost w-full justify-center mt-3 text-sm">
                <i className="fa-solid fa-plus ml-1" /> إضافة محتوى
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Content Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="إضافة محتوى جديد" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          {/* Type Selector */}
          <div>
            <label className="input-label">نوع المحتوى</label>
            <div className="flex gap-2">
              {CONTENT_TYPES.map(t => (
                <button key={t} type="button" onClick={() => setContentType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${contentType === t ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-dark-border text-gray-500'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="input-label">العنوان *</label>
            <input className="input-field" placeholder="عنوان المحتوى..." value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          {contentType === 'تكليف' && (
            <div>
              <label className="input-label">موعد التسليم النهائي</label>
              <input type="datetime-local" className="input-field" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          )}

          {contentType !== 'إعلان' && (
            <div>
              <label className="input-label">رفع ملفات (اختياري)</label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-dark-border'}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('instrFile').click()}
              >
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-300 mb-2 block" />
                <p className="text-sm text-gray-400">اسحب الملفات أو انقر للاختيار</p>
                <input id="instrFile" type="file" multiple className="hidden" onChange={handleDrop} />
              </div>
              {files.length > 0 && (
                <div className="mt-2 space-y-1">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                      <i className="fa-solid fa-check-circle" /> {f.name}
                      <button type="button" onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 mr-auto">
                        <i className="fa-solid fa-xmark" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setAddModal(false)} className="flex-1 btn-outline">إلغاء</button>
            <button type="submit" disabled={loading} className="flex-1 btn-primary justify-center">
              {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <><i className="fa-solid fa-check ml-1" />حفظ</>}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default InstructorCoursesPage;
