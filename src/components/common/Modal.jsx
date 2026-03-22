import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-DEFAULT/60 backdrop-blur-sm" style={{ background: 'rgba(26,26,20,0.7)' }} onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} card animate-fade-up shadow-2xl`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-subtle">
            <h3 className="font-bold text-ink dark:text-cream-DEFAULT" style={{ fontFamily: "'Noto Serif Arabic', serif", color: 'inherit' }}>{title}</h3>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink dark:hover:text-cream-DEFAULT transition-colors">
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="sm">
    <div className="text-center">
      <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(139,58,42,0.1)', borderRadius: '2px' }}>
        <i className="fa-solid fa-triangle-exclamation text-2xl" style={{ color: '#8B3A2A' }} />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Noto Serif Arabic', serif" }}>{title || 'تأكيد الحذف'}</h3>
      <p className="text-sm mb-6 text-muted">{message || 'هل أنت متأكد؟ لا يمكن التراجع.'}</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 btn-outline">إلغاء</button>
        <button onClick={onConfirm} disabled={loading} className="flex-1 btn-danger justify-center">
          {loading ? <i className="fa-solid fa-spinner fa-spin" /> : 'تأكيد الحذف'}
        </button>
      </div>
    </div>
  </Modal>
);

export default Modal;
