import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';

const NOTIFICATIONS = [
  { id: 1, text: '3 طلاب سلموا تكليف قواعد البيانات متأخرين', type: 'warning', time: 'منذ ساعة' },
  { id: 2, text: 'في انتظار رصد درجات مادة هندسة البرمجيات', type: 'info', time: 'منذ يومين' },
  { id: 3, text: 'تم رفع 5 أسئلة جديدة في منتدى الذكاء الاصطناعي', type: 'info', time: 'أمس' },
];

const TODAY_SCHEDULE = [
  { course: 'تصميم قواعد البيانات', time: '9:00 - 10:30', room: 'E-204', section: 'Section A', students: 38 },
  { course: 'هندسة البرمجيات المتقدمة', time: '12:00 - 1:30', room: 'C-101', section: 'Section B', students: 32 },
];

const notifColors = {
  warning: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/30 text-orange-700 dark:text-orange-300',
  info: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-300',
};
const notifIcons = { warning: 'fa-triangle-exclamation text-orange-500', info: 'fa-circle-info text-blue-500' };

const InstructorDashboard = () => {
  const { user } = useApp();
  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        {/* Greeting */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
          <p className="text-indigo-200 text-sm mb-1">أهلاً بك 👋</p>
          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'Cairo' }}>{user?.name}</h1>
          <p className="text-indigo-200 text-sm">قسم علوم الحاسب — الفصل الدراسي الثاني 2024</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'مقرراتي', value: 4, icon: 'fa-book-open', iconBg: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' },
            { label: 'الطلاب المسجلين', value: 142, icon: 'fa-users', iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
            { label: 'تكليفات منتظرة', value: 8, icon: 'fa-clock', iconBg: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
            { label: 'مواد لم تُرصد', value: 2, icon: 'fa-star', iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
          ].map(({ label, value, icon, iconBg }) => (
            <div key={label} className="stat-card">
              <div className={`stat-icon ${iconBg}`}><i className={`fa-solid ${icon}`} /></div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today Schedule */}
          <div className="card p-5">
            <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-calendar-day text-primary-600" /> محاضرات اليوم
            </h2>
            <div className="space-y-3">
              {TODAY_SCHEDULE.map((cls, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border border-primary-100 dark:border-primary-800">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{cls.course}</h3>
                    <span className="badge-primary text-xs">{cls.section}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span><i className="fa-solid fa-clock ml-1" />{cls.time}</span>
                    <span><i className="fa-solid fa-location-dot ml-1" />{cls.room}</span>
                    <span><i className="fa-solid fa-users ml-1" />{cls.students} طالب</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-5">
            <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-bell text-accent-600" /> الإشعارات
            </h2>
            <div className="space-y-3">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl border ${notifColors[n.type]}`}>
                  <i className={`fa-solid ${notifIcons[n.type]} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.text}</p>
                    <p className="text-xs opacity-60 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;
