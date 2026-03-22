import React from 'react';
import { useScrollTop } from '../../hooks/useScrollTop';

const BackToTop = () => {
  const { visible, scrollToTop } = useScrollTop();
  return (
    <button
      onClick={scrollToTop}
      aria-label="العودة للأعلى"
      className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300"
      style={{
        background: '#2D4A22',
        borderRadius: '2px',
        color: '#C8A96E',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}>
      <i className="fa-solid fa-chevron-up text-xs" />
    </button>
  );
};

export default BackToTop;
