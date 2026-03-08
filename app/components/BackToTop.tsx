'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full
        bg-gradient-to-br from-indigo-500 to-violet-600
        shadow-lg shadow-indigo-500/30 ring-1 ring-white/10
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 hover:shadow-indigo-500/50
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ArrowUp size={16} className="text-white" />
    </button>
  );
}
