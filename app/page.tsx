import Image from "next/image";

export default async function Home({ props }: { props: any }) {
 const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&count=9`, { next: { revalidate: 86400 } });
 const images = await data.json();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">NASA Astronomy Picture of the Day</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.error && <p className="text-red-500">{images.error.message}</p>}
      </div>
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
    </div>
  );
}
