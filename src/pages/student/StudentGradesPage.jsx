import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { STUDENT_COURSES } from '../../data/mockData';

const GRADE_LETTERS = (g) => {
  if (!g) return { letter: 'جارية', color: 'text-blue-500' };
  if (g >= 95) return { letter: 'A+', color: 'text-green-600' };
  if (g >= 90) return { letter: 'A',  color: 'text-green-600' };
  if (g >= 85) return { letter: 'B+', color: 'text-primary-600' };
  if (g >= 80) return { letter: 'B',  color: 'text-primary-600' };
  if (g >= 75) return { letter: 'C+', color: 'text-yellow-600' };
  if (g >= 70) return { letter: 'C',  color: 'text-yellow-600' };
  return { letter: 'D', color: 'text-red-500' };
};

const GPA = 3.7;

const StudentGradesPage = () => (
  <DashboardLayout role="student">
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 dark:text-white">درجاتي</h1>

      {/* GPA Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-primary-200 text-sm mb-1">المعدل التراكمي الكلي</p>
          <div className="flex items-end gap-3">
            <span className="text-6xl font-black">{GPA}</span>
            <span className="text-primary-300 mb-2">/ 4.0</span>
          </div>
          <p className="text-primary-200 text-sm">مستوى: <strong className="text-white">ممتاز</strong></p>
        </div>
        <div className="text-center md:text-right">
          <div className="text-4xl font-black text-yellow-300 mb-1">87</div>
          <p className="text-primary-200 text-sm">ساعات معتمدة</p>
          <p className="text-primary-300 text-xs mt-1">من أصل 160 ساعة</p>
        </div>
        <div className="w-32 h-32 relative flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeWidth="3"
              strokeDasharray={`${(GPA / 4) * 100} 100`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-black text-lg">{Math.round((GPA / 4) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-dark-border">
          <h2 className="font-black text-gray-900 dark:text-white">درجات هذا الفصل</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>المادة</th>
                <th>الكود</th>
                <th>أعمال السنة</th>
                <th>الميد تيرم</th>
                <th>النهائي</th>
                <th>الإجمالي</th>
                <th>التقدير</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_COURSES.map(c => {
                const gl = GRADE_LETTERS(c.grade);
                return (
                  <tr key={c.id}>
                    <td className="font-semibold text-gray-900 dark:text-white">{c.name}</td>
                    <td><span className="badge-primary text-xs">{c.code}</span></td>
                    <td>{c.grade ? Math.round(c.grade * 0.3) : '—'}</td>
                    <td>{c.grade ? Math.round(c.grade * 0.3) : '—'}</td>
                    <td>{c.grade ? Math.round(c.grade * 0.4) : '—'}</td>
                    <td className="font-bold text-gray-900 dark:text-white">{c.grade || '—'}</td>
                    <td><span className={`font-black text-lg ${gl.color}`}>{gl.letter}</span></td>
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

export default StudentGradesPage;
