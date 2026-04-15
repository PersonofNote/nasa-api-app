'use client';

import { useEffect, useState } from 'react';
import type { APOD } from './lib/apod';
import { PictureCard } from './PictureCard';

const STORAGE_KEY = 'visitedPictures';

function readVisited(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeVisited(visited: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
}

export function PictureGrid({ images }: { images: APOD[] }) {
  const [visited, setVisited] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setVisited(readVisited());
  }, []);

  const markVisited = (date: string) => {
    setVisited((prev) => {
      if (prev.has(date)) return prev;
      const next = new Set(prev);
      next.add(date);
      writeVisited(next);
      return next;
    });
  };

  const clearVisited = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setVisited(new Set());
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600">
          {visited.size} visited
        </p>
        <button
          type="button"
          onClick={clearVisited}
          disabled={visited.size === 0}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear visited
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <PictureCard
            key={image.date}
            image={image}
            visited={visited.has(image.date)}
            onVisit={() => markVisited(image.date)}
          />
        ))}
      </div>
    </>
  );
}
