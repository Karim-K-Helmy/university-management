import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { STUDENT_COURSES } from '../../data/mockData';

const StudentCoursesPage = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">مقرراتي الدراسية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">الفصل الدراسي الثاني 2024 — {STUDENT_COURSES.length} مقررات</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STUDENT_COURSES.map(c => (
            <Link key={c.id} to={`/student/courses/${c.id}`} className="card-hover dashboard-course-card p-5">
              <div className="flex items-start gap-4">
                <div className="dashboard-icon w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white flex-shrink-0 shadow-glow">
                  <i className="fa-solid fa-book-open" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate">{c.name}</h3>
                    <span className="badge-primary text-xs flex-shrink-0 mr-2">{c.code}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-cream-deep mb-3">{c.doctor}</p>
                  <div className="course-meta flex items-center gap-4 text-xs text-gray-500 dark:text-cream-deep">
                    <span><i className="fa-solid fa-play-circle ml-1" />{c.lectures} محاضرة</span>
                    <span><i className="fa-solid fa-clock ml-1" />{c.credits} ساعات</span>
                    {c.grade !== null ? (
                      <span className="grade-inline">
                        <i className="fa-solid fa-star ml-1" /> الدرجة: {c.grade}
                      </span>
                    ) : (
                      <span className="text-blue-500"><i className="fa-solid fa-spinner fa-spin ml-1" />جارية</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCoursesPage;
