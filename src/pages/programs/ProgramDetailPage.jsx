import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROGRAMS, FACULTY } from '../../data/mockData';

const CURRICULUM = {
  1: [
    { year: 'السنة الأولى', courses: [{ name: 'مقدمة في البرمجة', credits: 3, desc: 'أساسيات Python وخوارزميات الحل' }, { name: 'رياضيات هندسية', credits: 3, desc: 'الجبر الخطي والتفاضل والتكامل' }, { name: 'فيزياء', credits: 2, desc: 'الميكانيكا والكهرومغناطيسية' }] },
    { year: 'السنة الثانية', courses: [{ name: 'هياكل البيانات', credits: 3, desc: 'الأشجار والرسوم البيانية والخوارزميات' }, { name: 'نظم التشغيل', credits: 3, desc: 'إدارة العمليات والذاكرة' }, { name: 'شبكات الحاسب', credits: 3, desc: 'بروتوكولات TCP/IP واللاسلكي' }] },
    { year: 'السنة الثالثة', courses: [{ name: 'قواعد البيانات', credits: 3, desc: 'SQL، NoSQL، التصميم' }, { name: 'هندسة البرمجيات', credits: 3, desc: 'Agile, Design Patterns' }, { name: 'الأمن السيبراني', credits: 3, desc: 'التشفير وأمن الشبكات' }] },
    { year: 'السنة الرابعة', courses: [{ name: 'مشروع التخرج', credits: 6, desc: 'مشروع عملي شامل بإشراف أكاديمي' }, { name: 'التدريب الميداني', credits: 3, desc: 'تدريب في شركات شريكة' }] },
  ],
};

const JOBS = ['مهندس برمجيات', 'مطور Full-Stack', 'مهندس DevOps', 'محلل أنظمة', 'رائد أعمال تقني', 'مستشار IT'];

const ProgramDetailPage = () => {
  const { id } = useParams();
  const program = PROGRAMS.find(p => p.id === parseInt(id)) || PROGRAMS[0];
  const curriculum = CURRICULUM[1];
  const [openYear, setOpenYear] = useState(0);
  const [activeTab, setActiveTab] = useState('curriculum');

  const tabs = [
    { id: 'curriculum', label: 'الخطة الدراسية', icon: 'fa-book' },
    { id: 'jobs', label: 'مجالات العمل', icon: 'fa-briefcase' },
    { id: 'faculty', label: 'هيئة التدريس', icon: 'fa-chalkboard-teacher' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80`} />
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <div>
            <Link to="/programs" className="text-white/70 hover:text-white text-sm flex items-center gap-1 mb-3">
              <i className="fa-solid fa-chevron-right text-xs" /> جميع البرامج
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <i className={`fa-solid ${program.icon} text-white text-xl`} />
              </div>
              <div>
                <p className="text-white/70 text-sm">{program.college}</p>
                <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Cairo' }}>{program.title}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {[{ icon: 'fa-clock', label: program.duration }, { icon: 'fa-users', label: `${program.seats} مقعد` }, { icon: 'fa-laptop', label: program.mode }].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  <i className={`fa-solid ${icon}`} /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* Description */}
        <div className="card p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{program.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-dark-border overflow-x-auto scrollbar-hide">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-btn flex items-center gap-2 whitespace-nowrap rounded-none border-b-2 -mb-px ${activeTab === t.id ? 'border-primary-600 text-primary-600 bg-transparent' : 'border-transparent'}`}>
              <i className={`fa-solid ${t.icon}`} /> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'curriculum' && (
          <div className="space-y-3">
            {curriculum.map((year, yi) => (
              <div key={yi} className="card overflow-hidden">
                <button onClick={() => setOpenYear(openYear === yi ? -1 : yi)} className="w-full flex items-center justify-between p-5 text-right hover:bg-gray-50 dark:hover:bg-dark-border/30 transition-colors">
                  <span className="font-bold text-gray-900 dark:text-white">{year.year}</span>
                  <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${openYear === yi ? 'rotate-180' : ''}`} />
                </button>
                {openYear === yi && (
                  <div className="border-t border-gray-100 dark:border-dark-border">
                    <table className="data-table">
                      <thead><tr><th>المادة</th><th>الساعات</th><th>الوصف</th></tr></thead>
                      <tbody>
                        {year.courses.map((course, ci) => (
                          <tr key={ci}>
                            <td className="font-semibold text-gray-900 dark:text-white">{course.name}</td>
                            <td><span className="badge-primary">{course.credits} ساعات</span></td>
                            <td className="text-gray-500">{course.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5">المسارات المهنية المتاحة</h3>
            <div className="flex flex-wrap gap-3">
              {JOBS.map(job => (
                <span key={job} className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-xl text-sm font-semibold border border-primary-100 dark:border-primary-800 hover:bg-primary-100 transition-colors cursor-default">
                  <i className="fa-solid fa-briefcase ml-2 text-xs opacity-70" /> {job}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FACULTY.slice(0, 4).map(member => (
              <div key={member.id} className="card p-5 flex items-center gap-4">
                <img src={member.image} alt={member.name} className="w-14 h-14 rounded-xl" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-primary-600 dark:text-primary-400 text-sm">{member.title}</p>
                  <a href={`mailto:${member.email}`} className="text-xs text-gray-400 hover:text-primary-600 transition-colors">
                    <i className="fa-solid fa-envelope ml-1" />{member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Apply CTA */}
        <div className="mt-10 card p-8 text-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border-primary-200 dark:border-primary-800">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">مستعد للانضمام؟</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">قدّم طلبك الآن وابدأ رحلتك نحو المستقبل</p>
          <Link to="/admissions/apply" className="btn-primary text-base px-8 py-3 inline-flex">
            <i className="fa-solid fa-file-pen ml-2" /> تقديم الطلب
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailPage;
