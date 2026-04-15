import { getRecentAPODs, APOD } from './lib/apod';
import { PictureGrid } from './PictureGrid';

export default async function Home() {
  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(start_date.getDate() - 9);

  let images: APOD[] = [];
  let error: string | null = null;

  try {
    images = await getRecentAPODs();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load images';
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recent NASA Astronomy Pictures of the Day</h1>
      {error && <p className="text-red-500">{error}</p>}
      <PictureGrid images={images} />
   
    </div>
  );
}
