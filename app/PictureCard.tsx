'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { APOD } from './lib/apod';
import { isMp4Url } from './lib/media';

export function PictureCard({
  image,
  visited,
  onVisit,
}: {
  image: APOD;
  visited: boolean;
  onVisit: () => void;
}) {
  return (
    <Link
      href={`/pictures/${image.date}`}
      onClick={onVisit}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow block"
    >
      {image.media_type === 'image' ? (
        <Image
          src={image.url}
          alt={image.title}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />
      ) : isMp4Url(image.url) ? (
        <video
          src={image.url}
          muted
          playsInline
          preload="metadata"
          className="object-cover w-full h-48 pointer-events-none bg-black"
        />
      ) : (
        <div className="w-full h-48 bg-gray-900 text-white flex items-center justify-center text-sm">
          ▶ Video
        </div>
      )}
      <div className="p-4">
        <h2
          className={`text-lg font-semibold ${
            visited ? 'text-purple-600' : ''
          }`}
        >
          {image.title}
        </h2>
        <p className="text-sm text-gray-600">{image.date}</p>
      </div>
    </Link>
  );
}
