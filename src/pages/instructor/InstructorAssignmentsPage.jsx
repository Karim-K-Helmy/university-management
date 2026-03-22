import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

const SUBMISSIONS = [
  { id: 1, name: 'أحمد محمد الشمري',   submittedAt: '2024-03-08 10:23', late: false, grade: 85, file: 'assignment1_ahmed.pdf' },
  { id: 2, name: 'سارة علي القحطاني',  submittedAt: '2024-03-09 02:15', late: true,  grade: null, file: 'assignment1_sara.zip' },
  { id: 3, name: 'خالد عمر الحربي',    submittedAt: '2024-03-07 22:00', late: false, grade: 92, file: 'assignment1_khalid.pdf' },
  { id: 4, name: 'عمر عبدالله الدوسري',submittedAt: '2024-03-09 09:10', late: true,  grade: null, file: 'assignment1_omar.docx' },
];

const InstructorAssignmentsPage = () => {
  const { addToast } = useApp();
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [viewModal, setViewModal] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const updateGrade = (id, val) => {
    setSubmissions(ss => ss.map(s => s.id === id ? { ...s, grade: val === '' ? null : Number(val) } : s));
  };

  const handleBlur = async (id) => {
    setSavingId(id);
    await new Promise(r => setTimeout(r, 600));
    setSavingId(null);
    addToast('تم حفظ الدرجة', 'success');
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">التكليفات والتقييم</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">تكليف 1: تصميم قاعدة بيانات مكتبة — CS401</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'إجمالي الطلاب', value: 38, color: 'text-gray-900 dark:text-white' },
            { label: 'سلّموا', value: submissions.length, color: 'text-green-600' },
            { label: 'متأخرون', value: submissions.filter(s => s.late).length, color: 'text-orange-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-4 text-center">
              <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>اسم الطالب</th>
                  <th>تاريخ التسليم</th>
                  <th>الحالة</th>
                  <th>الدرجة (/100)</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s.id}>
                    <td className="font-semibold text-gray-900 dark:text-white">{s.name}</td>
                    <td className="text-sm text-gray-500">{s.submittedAt}</td>
                    <td>
                      {s.late ? <span className="badge-warning text-xs">متأخر</span> : <span className="badge-success text-xs">في الوقت</span>}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min="0" max="100"
                          className="w-16 px-2 py-1 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                          value={s.grade ?? ''}
                          onChange={e => updateGrade(s.id, e.target.value)}
                          onBlur={() => handleBlur(s.id)}
                          placeholder="—"
                        />
                        {savingId === s.id && <i className="fa-solid fa-spinner fa-spin text-primary-500 text-xs" />}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => setViewModal(s)} className="btn-ghost text-sm py-1 px-3">
                        <i className="fa-solid fa-eye ml-1" />عرض
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Submission Modal */}
      <Modal isOpen={!!viewModal} onClose={() => setViewModal(null)} title="عرض التسليم" size="lg">
        {viewModal && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[['الطالب', viewModal.name], ['الملف', viewModal.file], ['التسليم', viewModal.submittedAt], ['الحالة', viewModal.late ? 'متأخر' : 'في الوقت']].map(([k, v]) => (
                <div key={k} className="card p-3">
                  <p className="text-xs text-gray-400 mb-1">{k}</p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 dark:bg-dark-border rounded-xl p-8 text-center">
              <i className="fa-solid fa-file-pdf text-5xl text-red-400 mb-3 block" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">{viewModal.file}</p>
              <button className="btn-primary mt-4 text-sm">
                <i className="fa-solid fa-download ml-1" /> تحميل الملف
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default InstructorAssignmentsPage;
