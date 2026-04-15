import { Suspense } from 'react';
import Image from 'next/image';
import { getAPOD } from '../../lib/apod';
import { isMp4Url } from '../../lib/media';
import { PLACEHOLDER_BLUR } from '../../lib/placeholder';

export default function PictureDetailPage({
  params,
}: PageProps<'/pictures/[date]'>) {
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">

      <Suspense fallback={<DetailSkeleton />}>
        {params.then(({ date }) => (
          <Detail date={date} />
        ))}
      </Suspense>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading picture"
      className="mt-4 w-full max-w-3xl animate-pulse"
    >
      <div className="h-6 w-1/2 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
      <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
      <div className="aspect-video w-full rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

async function Detail({ date }: { date: string }) {
  const apod = await getAPOD(date);

  return (
    <article className="mt-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{apod.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{apod.date}</p>
      {apod.media_type === 'image' ? (
        <Image
          src={apod.hdurl ?? apod.url}
          alt={apod.title}
          width={800}
          height={600}
          className="w-full h-auto rounded-lg"
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
        />
      ) : isMp4Url(apod.url) ? (
        <video
          src={apod.url}
          controls
          playsInline
          className="w-full h-auto rounded-lg bg-black"
        />
      ) : (
        <div className="aspect-video">
          <iframe
            src={apod.url}
            title={apod.title}
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      )}
      {apod.copyright && (
        <p className="text-sm text-gray-600 mt-2">© {apod.copyright}</p>
      )}
      <p className="mt-4 leading-relaxed">{apod.explanation}</p>
    </article>
  );
}
