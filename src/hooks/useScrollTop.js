import { useState, useEffect } from 'react';

export const useScrollTop = (threshold = 400) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return { visible, scrollToTop };
};
