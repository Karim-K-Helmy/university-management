import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import { STUDENT_COURSES } from '../../data/mockData';

const TODOS = [
  { id: 1, text: 'تسليم تكليف قواعد البيانات', done: false, urgent: true },
  { id: 2, text: 'مراجعة محاضرات الذكاء الاصطناعي', done: false, urgent: false },
  { id: 3, text: 'حل تمارين الإحصاء', done: true, urgent: false },
];

const GPA = 3.7;

const StudentDashboard = () => {
  const { user } = useApp();
  const [todos, setTodos] = useState(TODOS);
  const [newTodo, setNewTodo] = useState('');

  const toggleTodo = (id) => setTodos(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos(ts => [...ts, { id: Date.now(), text: newTodo, done: false, urgent: false }]);
    setNewTodo('');
  };

  const gpaColor = GPA >= 3.5 ? 'text-green-600' : GPA >= 2.5 ? 'text-yellow-500' : 'text-red-500';
  const gpaLabel = GPA >= 3.5 ? 'ممتاز' : GPA >= 2.5 ? 'جيد' : 'يحتاج تحسين';

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Greeting */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
          <p className="text-primary-200 text-sm mb-1">مرحباً بعودتك 👋</p>
          <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'Cairo' }}>{user?.name}</h1>
          <p className="text-primary-200 text-sm">الفصل الدراسي الثاني 2024 — هيئة الحاسبات</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'المعدل التراكمي', value: GPA, suffix: '/4.0', color: gpaColor, sub: gpaLabel, icon: 'fa-star', iconBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' },
            { label: 'مقررات هذا الترم', value: STUDENT_COURSES.length, suffix: '', color: 'text-primary-600', sub: 'مادة', icon: 'fa-book-open', iconBg: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' },
            { label: 'ساعات مكتملة', value: 87, suffix: '', color: 'text-green-600', sub: 'من 160', icon: 'fa-check-circle', iconBg: 'bg-green-100 dark:bg-green-900/30 text-green-600' },
            { label: 'تكليفات قادمة', value: todos.filter(t => !t.done && t.urgent).length, suffix: '', color: 'text-red-500', sub: 'عاجل', icon: 'fa-triangle-exclamation', iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
          ].map(({ label, value, suffix, color, sub, icon, iconBg }) => (
            <div key={label} className="stat-card dashboard-stat-card">
              <div className={`stat-icon ${iconBg}`}>
                <i className={`fa-solid ${icon}`} />
              </div>
              <div>
                <p className={`text-2xl font-black ${color}`}>{value}{suffix}</p>
                <p className="text-xs text-gray-600 dark:text-cream-deep">{label}</p>
                <p className="text-xs text-gray-500 dark:text-cream-deep">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Lectures */}
          <div className="card dashboard-panel p-5">
            <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-calendar-day text-primary-600" /> محاضرات اليوم
            </h2>
            {[
              { course: 'تصميم قواعد البيانات', time: '9:00 - 10:30', room: 'E-204', current: true },
              { course: 'الذكاء الاصطناعي', time: '11:00 - 12:30', room: 'A-301', current: false },
            ].length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <i className="fa-solid fa-mug-hot text-3xl mb-2 block" />
                <p className="text-sm">يومك فاضي، يلا اذاكر! ☕</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { course: 'تصميم قواعد البيانات', time: '9:00 - 10:30', room: 'E-204', current: true },
                  { course: 'الذكاء الاصطناعي', time: '11:00 - 12:30', room: 'A-301', current: false },
                ].map((lec, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${lec.current ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 ring-1 ring-primary-400 animate-pulse2' : 'border-gray-100 dark:border-dark-border'}`}>
                    <div className={`w-2 h-10 rounded-full flex-shrink-0 ${lec.current ? 'bg-primary-600' : 'bg-gray-200 dark:bg-dark-border'}`} />
                    <div className="flex-1">
                      <p className={`font-semibold text-sm ${lec.current ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>{lec.course}</p>
                      <p className="text-xs text-gray-500 dark:text-cream-deep">{lec.time} | قاعة {lec.room}</p>
                    </div>
                    {lec.current && <span className="badge-primary text-xs">الآن</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* To-Do List */}
          <div className="card dashboard-panel p-5">
            <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-accent-600" /> قائمة المهام
            </h2>
            <div className="space-y-2 mb-4">
              {todos.map(todo => (
                <div key={todo.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${todo.done ? 'opacity-50 border-gray-100 dark:border-dark-border' : todo.urgent ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/10' : 'border-gray-100 dark:border-dark-border'}`}>
                  <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} className="w-4 h-4 accent-primary-600 cursor-pointer" />
                  <span className={`flex-1 text-sm ${todo.done ? 'line-through text-gray-400' : todo.urgent ? 'text-orange-700 dark:text-orange-300 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    {todo.text}
                  </span>
                  {todo.urgent && !todo.done && <span className="badge-warning text-[10px]">عاجل</span>}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="input-field text-sm flex-1" placeholder="أضف مهمة جديدة..." value={newTodo} onChange={e => setNewTodo(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} />
              <button onClick={addTodo} className="btn-primary py-2 px-3 text-sm">
                <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="card dashboard-panel p-5">
          <h2 className="font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fa-solid fa-book text-primary-600" /> مقرراتي
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STUDENT_COURSES.map(c => (
              <div key={c.id} className="dashboard-course-row flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-border/30 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors border border-gray-100 dark:border-dark-border">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-book-open text-primary-600 dark:text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-500 dark:text-cream-deep">{c.doctor} • {c.lectures} محاضرة</p>
                </div>
                {c.grade !== null ? (
                  <span className="grade-chip">{c.grade}</span>
                ) : (
                  <span className="badge-gray text-xs dark-readable-badge">جارية</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
