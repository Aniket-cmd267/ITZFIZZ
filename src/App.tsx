import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';

export default function App() {
  const [isAccessibleMode, setIsAccessibleMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsAccessibleMode(true);
    }

    const handler = (e: MediaQueryListEvent) => {
      setIsAccessibleMode(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full bg-[#121212] text-white selection:bg-[#45db7d] selection:text-black">
      <main className="w-full">
        <HeroSection isAccessibleMode={isAccessibleMode} />
      </main>
    </div>
  );
}
