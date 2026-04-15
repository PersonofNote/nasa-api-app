import { getRecentAPODs } from './lib/apod';
import { PictureGrid } from './PictureGrid';

export default async function Home() {
  const images = await getRecentAPODs();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recent NASA Astronomy Pictures of the Day</h1>
      <PictureGrid images={images} />
    </div>
  );
}
