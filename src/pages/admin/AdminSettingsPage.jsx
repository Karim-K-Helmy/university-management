import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';

const Toggle = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-border/30 border border-gray-100 dark:border-dark-border">
    <div>
      <p className="font-semibold text-gray-900 dark:text-white text-sm">{label}</p>
      {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-border'}`}
    >
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

const AdminSettingsPage = () => {
  const { admissionsOpen, setAdmissionsOpen, addToast } = useApp();
  const [settings, setSettings] = useState({
    newSemester: false,
    emailNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
  });

  const toggle = (key) => {
    setSettings(s => ({ ...s, [key]: !s[key] }));
    addToast('تم تحديث الإعداد', 'success');
  };

  const handleToggleAdmissions = (val) => {
    setAdmissionsOpen(val);
    addToast(val ? 'تم فتح باب التسجيل' : 'تم إغلاق باب التسجيل', val ? 'success' : 'warning');
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">إعدادات النظام</h1>

        {/* Admissions */}
        <div className="card p-6">
          <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fa-solid fa-door-open text-primary-600" /> إعدادات القبول والتسجيل
          </h2>
          <div className="space-y-3">
            <Toggle label="فتح باب التسجيل" desc='تفعيل زر "قدّم الآن" في الصفحة الرئيسية' checked={admissionsOpen} onChange={handleToggleAdmissions} />
            <Toggle label="السماح بالتسجيل الذاتي" desc="السماح للمستخدمين الجدد بإنشاء حسابات" checked={settings.allowRegistration} onChange={() => toggle('allowRegistration')} />
            <Toggle label="بداية ترم جديد" desc="سيتم تحديث جداول الطلاب وإضافة مقررات جديدة" checked={settings.newSemester} onChange={() => toggle('newSemester')} />
          </div>
        </div>

        {/* System */}
        <div className="card p-6">
          <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fa-solid fa-gear text-gray-600" /> إعدادات النظام
          </h2>
          <div className="space-y-3">
            <Toggle label="إشعارات البريد الإلكتروني" desc="إرسال إشعارات تلقائية للطلاب" checked={settings.emailNotifications} onChange={() => toggle('emailNotifications')} />
            <Toggle label="وضع الصيانة" desc="إيقاف الموقع مؤقتاً للصيانة" checked={settings.maintenanceMode} onChange={() => toggle('maintenanceMode')} />
          </div>
        </div>

        {/* Email Templates */}
        <div className="card p-6">
          <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fa-solid fa-envelope text-accent-600" /> قوالب البريد الإلكتروني
          </h2>
          <div className="space-y-3">
            {[
              { label: 'رسالة الترحيب', icon: 'fa-hand-wave' },
              { label: 'رسالة قبول الطلب', icon: 'fa-check-circle' },
              { label: 'رسالة رفض الطلب', icon: 'fa-times-circle' },
              { label: 'تذكير بموعد التسجيل', icon: 'fa-bell' },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-border/30 border border-gray-100 dark:border-dark-border">
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${icon} text-primary-600`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{label}</span>
                </div>
                <button className="btn-ghost text-sm py-1 px-3" onClick={() => addToast('محرر القوالب قريباً', 'info')}>
                  <i className="fa-solid fa-pen ml-1" /> تعديل
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => addToast('تم حفظ جميع الإعدادات', 'success')}>
            <i className="fa-solid fa-floppy-disk ml-1" /> حفظ الإعدادات
          </button>
          <button className="btn-outline" onClick={() => addToast('تم إعادة تعيين الإعدادات الافتراضية', 'info')}>
            <i className="fa-solid fa-rotate-right ml-1" /> إعادة تعيين
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;
