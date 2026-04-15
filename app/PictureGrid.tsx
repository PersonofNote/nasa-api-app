'use client';

import { useEffect, useState, useTransition } from 'react';
import type { APOD } from './lib/apod';
import { PictureCard } from './PictureCard';
import { fetchAPODs } from './actions';

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

export function PictureGrid({
  images: initialImages,
  initialStart,
  initialEnd,
}: {
  images: APOD[];
  initialStart: string;
  initialEnd: string;
}) {
  const [images, setImages] = useState<APOD[]>(initialImages);
  const [startDate, setStartDate] = useState<string>(initialStart ?? '');
  const [endDate, setEndDate] = useState<string>(initialEnd ?? '');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate > endDate) {
      setError('Start date must be on or before end date.');
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        const next = await fetchAPODs(startDate, endDate);
        setImages(next);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pictures');
      }
    });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-wrap items-end gap-3 mb-4"
      >
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-gray-600 dark:text-gray-400">Start</span>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800"
          />
        </label>
        <label className="flex flex-col text-sm">
          <span className="mb-1 text-gray-600 dark:text-gray-400">End</span>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 bg-white dark:bg-gray-800"
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Loading…' : 'Show'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {visited.size} visited
        </p>
        <button
          type="button"
          onClick={clearVisited}
          disabled={visited.size === 0}
          className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear visited
        </button>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-opacity ${
          isPending ? 'opacity-50' : ''
        }`}
      >
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
