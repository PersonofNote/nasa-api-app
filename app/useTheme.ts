'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | null;

function readTheme(): Theme {
  if (typeof document === 'undefined') return null;
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
