import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PROGRAMS } from '../../data/mockData';
import { SkeletonCard } from '../../components/common/SkeletonLoader';

const COLLEGES = ['الكل', 'كلية الهندسة', 'كلية الحاسبات', 'كلية إدارة الأعمال'];
const MODES = ['الكل', 'انتظام', 'اونلاين', 'مسائي'];
const DURATIONS = ['الكل', '4 سنوات', '5 سنوات', 'سنتين'];

const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const ProgramsPage = () => {
  const [search, setSearch] = useState('');
  const [college, setCollege] = useState('الكل');
  const [mode, setMode] = useState('الكل');
  const [duration, setDuration] = useState('الكل');
  const [loading] = useState(false);
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => PROGRAMS.filter(p => {
    const matchSearch = !debouncedSearch || p.title.includes(debouncedSearch) || p.description.includes(debouncedSearch);
    const matchCollege = college === 'الكل' || p.college === college;
    const matchMode = mode === 'الكل' || p.mode === mode;
    const matchDuration = duration === 'الكل' || p.duration === duration;
    return matchSearch && matchCollege && matchMode && matchDuration;
  }), [debouncedSearch, college, mode, duration]);

  return (
    <div className="pt-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-950 py-16 px-4 text-center">
        <span className="section-tag border-white/20 bg-white/10 text-white inline-flex mb-4"><i className="fa-solid fa-layer-group" /> اكتشف مسارك</span>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: 'Cairo' }}>البرامج الأكاديمية</h1>
        <p className="text-primary-200 text-lg">اختر من بين 48 برنامجاً يناسب طموحاتك وشغفك</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card p-5 space-y-6 sticky top-24">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <i className="fa-solid fa-filter text-primary-600" /> تصفية النتائج
              </h3>

              {/* Search */}
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  className="input-field pr-9 text-sm"
                  placeholder="ابحث عن برنامج..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* College */}
              <div>
                <label className="input-label">الكلية</label>
                <div className="space-y-1">
                  {COLLEGES.map(c => (
                    <button key={c} onClick={() => setCollege(c)} className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${college === c ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <label className="input-label">نظام الدراسة</label>
                <div className="space-y-1">
                  {MODES.map(m => (
                    <button key={m} onClick={() => setMode(m)} className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${mode === m ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="input-label">مدة البرنامج</label>
                <div className="space-y-1">
                  {DURATIONS.map(d => (
                    <button key={d} onClick={() => setDuration(d)} className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${duration === d ? 'bg-primary-600 text-white font-semibold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-border'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => { setSearch(''); setCollege('الكل'); setMode('الكل'); setDuration('الكل'); }} className="btn-ghost w-full justify-center text-sm">
                <i className="fa-solid fa-rotate-right ml-1" /> إعادة تعيين
              </button>
            </div>
          </aside>

          {/* Programs Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                عرض <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> برنامج
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <i className="fa-solid fa-search text-5xl text-gray-200 dark:text-dark-border mb-4 block" />
                <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-400 text-sm">جرب تغيير معايير البحث</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <Link key={p.id} to={`/programs/${p.id}`} className="card-hover overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-60`} />
                      <div className="absolute top-3 right-3">
                        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <i className={`fa-solid ${p.icon} text-white text-sm`} />
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-3 badge bg-white/20 text-white text-xs">{p.mode}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-1">{p.college}</p>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">{p.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{p.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <i className="fa-solid fa-clock text-primary-500" /> {p.duration}
                        </span>
                        <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold hover:underline">
                          مزيد من التفاصيل →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
