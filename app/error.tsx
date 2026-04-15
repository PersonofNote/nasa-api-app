'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {error.message || 'Failed to load NASA pictures.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
