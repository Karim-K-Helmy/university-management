import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';

const STUDENTS = [
  { id: 1, name: 'أحمد محمد الشمري',   midterm: 42, final: null, work: 28 },
  { id: 2, name: 'سارة علي القحطاني',  midterm: 38, final: null, work: 25 },
  { id: 3, name: 'خالد عمر الحربي',    midterm: 45, final: 48,   work: 30 },
  { id: 4, name: 'نورة فهد العتيبي',   midterm: 40, final: 45,   work: 27 },
  { id: 5, name: 'عمر عبدالله الدوسري',midterm: 35, final: null, work: 22 },
];

const InstructorGradingPage = () => {
  const { addToast } = useApp();
  const [students, setStudents] = useState(STUDENTS);
  const [savingId, setSavingId] = useState(null);

  const updateGrade = (id, field, value) => {
    setStudents(ss => ss.map(s => s.id === id ? { ...s, [field]: value === '' ? null : Number(value) } : s));
  };

  const handleBlur = async (id) => {
    setSavingId(id);
    await new Promise(r => setTimeout(r, 600));
    setSavingId(null);
    addToast('تم حفظ الدرجة تلقائياً', 'success');
  };

  const total = (s) => s.final !== null ? s.work + s.midterm + s.final : null;

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">رصد الدرجات</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">تصميم قواعد البيانات — CS401</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-outline text-sm py-2 px-4">
              <i className="fa-solid fa-file-export ml-1" /> تصدير Excel
            </button>
            <button className="btn-primary text-sm py-2 px-4">
              <i className="fa-solid fa-file-import ml-1" /> استيراد
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="card p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 text-sm flex items-center gap-3">
          <i className="fa-solid fa-circle-info text-lg flex-shrink-0" />
          الدرجات تُحفظ تلقائياً عند الانتهاء من تعديل كل خانة. الدرجات الكاملة: أعمال سنة/30 — ميد تيرم/50 — نهائي/50.
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-8">#</th>
                  <th>اسم الطالب</th>
                  <th>أعمال السنة (/30)</th>
                  <th>الميد تيرم (/50)</th>
                  <th>النهائي (/50)</th>
                  <th>الإجمالي (/130)</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const tot = total(s);
                  return (
                    <tr key={s.id}>
                      <td className="text-gray-400 text-xs">{i + 1}</td>
                      <td className="font-semibold text-gray-900 dark:text-white">{s.name}</td>
                      <td>
                        <input
                          type="number" min="0" max="30"
                          className="w-16 px-2 py-1 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                          value={s.work ?? ''}
                          onChange={e => updateGrade(s.id, 'work', e.target.value)}
                          onBlur={() => handleBlur(s.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" max="50"
                          className="w-16 px-2 py-1 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                          value={s.midterm ?? ''}
                          onChange={e => updateGrade(s.id, 'midterm', e.target.value)}
                          onBlur={() => handleBlur(s.id)}
                        />
                      </td>
                      <td>
                        <input
                          type="number" min="0" max="50"
                          className="w-16 px-2 py-1 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                          value={s.final ?? ''}
                          onChange={e => updateGrade(s.id, 'final', e.target.value)}
                          onBlur={() => handleBlur(s.id)}
                        />
                      </td>
                      <td>
                        {tot !== null ? (
                          <span className={`font-black text-base ${tot >= 100 ? 'text-green-600' : tot >= 75 ? 'text-primary-600' : 'text-orange-500'}`}>
                            {tot}
                          </span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td>
                        {savingId === s.id ? (
                          <span className="text-xs text-primary-500 flex items-center gap-1">
                            <i className="fa-solid fa-spinner fa-spin" /> حفظ...
                          </span>
                        ) : s.final !== null ? (
                          <span className="badge-success text-xs">مكتمل</span>
                        ) : (
                          <span className="badge-warning text-xs">معلق</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorGradingPage;
