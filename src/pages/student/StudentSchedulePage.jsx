import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { SCHEDULE } from '../../data/mockData';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

const StudentSchedulePage = () => {
  const today = DAYS[1]; // mock "today" = Monday

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">الجدول الدراسي</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {DAYS.map(day => {
            const dayClasses = SCHEDULE.filter(s => s.day === day);
            const isToday = day === today;
            return (
              <div key={day} className={`card p-4 ${isToday ? 'ring-2 ring-primary-500' : ''}`}>
                <div className={`text-center py-2 rounded-lg mb-3 font-bold text-sm ${isToday ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-dark-border text-gray-700 dark:text-gray-300'}`}>
                  {day}
                  {isToday && <span className="block text-xs font-normal opacity-80">اليوم</span>}
                </div>
                <div className="space-y-2">
                  {dayClasses.length === 0 ? (
                    <p className="text-center text-xs text-gray-300 dark:text-gray-600 py-4">لا توجد محاضرات</p>
                  ) : dayClasses.map(cls => (
                    <div key={cls.id} className={`${cls.color} rounded-xl p-3 text-white cursor-pointer hover:opacity-90 transition-opacity`}>
                      <p className="font-semibold text-xs leading-tight mb-1">{cls.course}</p>
                      <p className="text-[10px] opacity-80">{cls.time}</p>
                      <p className="text-[10px] opacity-70">قاعة {cls.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="card p-4 flex flex-wrap gap-3">
          {[...new Set(SCHEDULE.map(s => s.course))].map((course, i) => {
            const s = SCHEDULE.find(x => x.course === course);
            return (
              <div key={course} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className={`w-3 h-3 rounded-full ${s.color}`} />
                {course}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentSchedulePage;
