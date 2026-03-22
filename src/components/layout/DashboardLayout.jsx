import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const MENUS = {
  student:    [{ label:'الرئيسية',icon:'fa-gauge',path:'/student'},{ label:'مقرراتي',icon:'fa-book-open',path:'/student/courses'},{ label:'الجدول',icon:'fa-calendar',path:'/student/schedule'},{ label:'درجاتي',icon:'fa-chart-bar',path:'/student/grades'},{ label:'الخدمات',icon:'fa-file-lines',path:'/student/requests'}],
  instructor: [{ label:'الرئيسية',icon:'fa-gauge',path:'/instructor'},{ label:'المقررات',icon:'fa-chalkboard-teacher',path:'/instructor/courses'},{ label:'التكليفات',icon:'fa-tasks',path:'/instructor/assignments'},{ label:'الدرجات',icon:'fa-star',path:'/instructor/grading'}],
  admin:      [{ label:'لوحة التحكم',icon:'fa-gauge',path:'/admin'},{ label:'المستخدمون',icon:'fa-users',path:'/admin/users'},{ label:'المحتوى',icon:'fa-newspaper',path:'/admin/content'},{ label:'الإعدادات',icon:'fa-gear',path:'/admin/settings'}],
};

const ROLE_BADGE = { student:'طالب', instructor:'عضو هيئة تدريس', admin:'مشرف النظام' };

const DashboardLayout = ({ children, role }) => {
  const { user, logout, darkMode, toggleDark } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const menu = MENUS[role] || [];

  const bg = darkMode ? '#0F130C' : '#F5F0E8';
  const sidebar_bg = darkMode ? '#161A12' : 'white';
  const border = darkMode ? '#2A2E24' : '#DDD3C2';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ background: '#2D4A22', borderRadius: '2px' }}>
          <i className="fa-solid fa-graduation-cap text-xs" style={{ color: '#C8A96E' }} />
        </div>
        {!collapsed && <span className="font-bold text-sm" style={{ fontFamily: "'Noto Serif Arabic', serif", color: darkMode ? '#E8E2D8' : '#1A1A14' }}>جامعة المستقبل</span>}
      </div>

      {/* User */}
      {!collapsed && user && (
        <div className="px-4 py-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: '#2D4A22', color: '#C8A96E', borderRadius: '2px' }}>
              {user.name?.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: darkMode ? '#E8E2D8' : '#1A1A14', fontFamily: "'Noto Serif Arabic', serif" }}>{user.name}</p>
              <p className="text-xs" style={{ color: '#C8A96E' }}>{ROLE_BADGE[role]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {menu.map(item => {
          const active = loc.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`sidebar-link ${active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              title={collapsed ? item.label : ''}>
              <i className={`fa-solid ${item.icon} text-sm w-4 text-center flex-shrink-0`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5" style={{ borderTop: `1px solid ${border}`, paddingTop: '0.75rem', marginTop: '0.75rem' }}>
        <button onClick={toggleDark} className={`sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}>
          <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-sm w-4 text-center`} />
          {!collapsed && <span>{darkMode ? 'وضع النهار' : 'الوضع الليلي'}</span>}
        </button>
        <Link to="/" className={`sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}>
          <i className="fa-solid fa-globe text-sm w-4 text-center" />
          {!collapsed && <span>الموقع العام</span>}
        </Link>
        <button onClick={() => { logout(); navigate('/login'); }}
          className={`sidebar-link w-full ${collapsed ? 'justify-center px-2' : ''}`}
          style={{ color: '#8B3A2A' }}>
          <i className="fa-solid fa-right-from-bracket text-sm w-4 text-center" />
          {!collapsed && <span>تسجيل خروج</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: bg }}>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-14' : 'w-60'}`}
        style={{ background: sidebar_bg, borderLeft: `1px solid ${border}` }}>
        <SidebarContent />
        <button onClick={() => setCollapsed(v => !v)}
          className="absolute flex items-center justify-center transition-all"
          style={{ top: '72px', left: collapsed ? '44px' : '228px', width: '20px', height: '20px', background: '#2D4A22', color: '#C8A96E', borderRadius: '99px', zIndex: 10, border: `2px solid ${sidebar_bg}` }}>
          <i className={`fa-solid fa-chevron-${collapsed ? 'right' : 'left'} text-[8px]`} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0" style={{ background: 'rgba(26,26,20,0.6)' }} onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 right-0 w-60" style={{ background: sidebar_bg, borderLeft: `1px solid ${border}` }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 h-14 flex-shrink-0"
          style={{ background: sidebar_bg, borderBottom: `1px solid ${border}` }}>
          <button onClick={() => setMobileOpen(true)} className="w-8 h-8 flex items-center justify-center"
            style={{ color: darkMode ? '#A0A090' : '#5C5C4E' }}>
            <i className="fa-solid fa-bars text-sm" />
          </button>
          <span className="font-semibold text-sm" style={{ fontFamily: "'Noto Serif Arabic', serif", color: darkMode ? '#E8E2D8' : '#1A1A14' }}>
            {menu.find(m => m.path === loc.pathname)?.label || 'لوحة التحكم'}
          </span>
          <div className="w-8 h-8 flex items-center justify-center font-bold text-xs"
            style={{ background: '#2D4A22', color: '#C8A96E', borderRadius: '2px' }}>
            {user?.name?.charAt(0)}
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
