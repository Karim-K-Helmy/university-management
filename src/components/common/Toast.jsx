import React from 'react';
import { useApp } from '../../context/AppContext';

const CONFIG = {
  success: { icon: 'fa-check', bg: 'bg-forest-DEFAULT', border: 'border-forest-muted' },
  error:   { icon: 'fa-xmark', bg: 'bg-rust-DEFAULT',   border: 'border-rust-light' },
  warning: { icon: 'fa-exclamation', bg: 'bg-gold-dark', border: 'border-gold-DEFAULT' },
  info:    { icon: 'fa-info', bg: 'bg-slate-DEFAULT',    border: 'border-slate-light' },
};

const INLINE_BG = { success:'#2D4A22', error:'#8B3A2A', warning:'#A88A4E', info:'#3A4A52' };

const Toast = ({ id, message, type }) => {
  const { removeToast } = useApp();
  return (
    <div
      className="flex items-start gap-3 px-5 py-4 text-cream-DEFAULT animate-fade-up min-w-[280px] max-w-sm shadow-xl border border-white/10"
      style={{ background: INLINE_BG[type] || '#2D4A22', borderRadius: '2px', fontFamily: "'Noto Serif Arabic', serif" }}
    >
      <i className={`fa-solid ${CONFIG[type]?.icon || 'fa-info'} text-sm mt-0.5 opacity-80 flex-shrink-0`} />
      <span className="text-sm flex-1 leading-relaxed" style={{ color: '#F5F0E8' }}>{message}</span>
      <button onClick={() => removeToast(id)} className="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
        <i className="fa-solid fa-xmark text-xs" />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed top-5 left-5 z-[9999] flex flex-col gap-2">
      {toasts.map(t => <Toast key={t.id} {...t} />)}
    </div>
  );
};

export default Toast;
