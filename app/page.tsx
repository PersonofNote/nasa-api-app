import { getAPODByDate } from './lib/apod';
import { PictureGrid } from './PictureGrid';

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-CA');
}

export default async function Home() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 9);
  const initialStart = formatDate(start);
  const initialEnd = formatDate(end);

  const images = await getAPODByDate({
    start_date: initialStart,
    end_date: initialEnd,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Recent NASA Astronomy Pictures of the Day</h1>
      <PictureGrid
        images={images}
        initialStart={initialStart}
        initialEnd={initialEnd}
      />
    </div>
  );
}
