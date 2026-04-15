import Image from "next/image";
import { getAPODByDate, APOD } from './lib/apod';

export default async function Home() {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(start_date.getDate() - 9);

  let images: APOD[] = [];
  let error: string | null = null;

  try {
    images = await getAPODByDate({
      start_date: start_date.toLocaleDateString('en-CA'),
      end_date: end_date.toLocaleDateString('en-CA'),
    });
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load images';
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pictures</h1>
      {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {images.length  && images?.map((image: any) => (
          <div key={image.url} className="border rounded-lg overflow-hidden">
            <Image
              src={image.url}
              alt={image.title}
              width={400}
              height={300}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{image.title}</h2>
              <p className="text-sm text-gray-600">{image.date}</p>
            </div>
          </div>
        ))}
      </div >
   
    </div>
  );
}
