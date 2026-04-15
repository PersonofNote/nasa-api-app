'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
type Theme = 'light' | 'dark';

function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === 'dark' ? '☀️ Light' : theme === 'light' ? '🌙 Dark' : '🌓'}
    </button>
  );
}
