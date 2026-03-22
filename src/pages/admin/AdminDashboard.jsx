import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

const RECENT = [
  { id: 1, action: 'تقديم جديد من محمد الشمري', time: 'منذ 10 دقائق', icon: 'fa-user-plus', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
  { id: 2, action: 'تعديل بيانات الطالب رقم 1234', time: 'منذ 30 دقيقة', icon: 'fa-user-pen', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  { id: 3, action: 'نشر خبر: افتتاح مختبر جديد', time: 'منذ ساعتين', icon: 'fa-newspaper', color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  { id: 4, action: 'تحديث إعدادات نظام القبول', time: 'أمس', icon: 'fa-gear', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' },
];

const AdminDashboard = () => (
  <DashboardLayout role="admin">
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <p className="text-gray-400 text-sm mb-1">لوحة تحكم المشرف</p>
        <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'Cairo' }}>مرحباً، مدير النظام</h1>
        <p className="text-gray-400 text-sm">آخر تسجيل دخول: اليوم 9:30 ص</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المستخدمين', value: '1,847', icon: 'fa-users', color: 'from-primary-500 to-primary-700' },
          { label: 'طلبات القبول', value: 234, icon: 'fa-file-pen', color: 'from-green-500 to-green-700' },
          { label: 'المقررات النشطة', value: 48, icon: 'fa-book-open', color: 'from-orange-500 to-orange-700' },
          { label: 'الأخبار المنشورة', value: 18, icon: 'fa-newspaper', color: 'from-purple-500 to-purple-700' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
              <i className={`fa-solid ${icon}`} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="card p-5">
        <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-primary-600" /> سجل النشاطات الأخيرة
        </h2>
        <div className="space-y-3">
          {RECENT.map(r => (
            <div key={r.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${r.color}`}>
                <i className={`fa-solid ${r.icon} text-sm`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{r.action}</p>
                <p className="text-xs text-gray-400">{r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default AdminDashboard;
