'use client';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed right-5 bottom-8 z-40 flex size-10 items-center justify-center rounded-md bg-brand text-white transition-opacity hover:bg-brand-dark"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 1px 5px 15px 0px' }}
      aria-label="回到頂端"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 14V2M2 7l6-5 6 5" />
      </svg>
    </button>
  );
}
