## Assessment Notes:

### What challenges were you trying to solve?
For this asessment, I was mostly trying to build the suggsted project and optimize it as much as possible within the time limit, while making the site at least somewhat visually appealing.

### What, if any, technical limitations were you working within?
The short timeframe and frequent 503s from NASA

### If you were collaborating with other developers how did you separate the work?
I didn't work with other developers on this. If I were to do so on a similar project, I would likely have one person working on the fetching/caching layer and another on the component display. If it was a much larger project and I had many resources available, I might have a third person working on the other UI elements like the theme toggle, decorative backgrounds, etc.

### What did you enjoy about the project?
The NASA Api is very friendly to work with, and it's always fun to get something up and running quickly and then optimize it.

### What would you do differently if you could do it over?
I wouldn't try to do the perfect incremental static regeneration strategy. It feels like a natural fit, since the data updates exactly once per day, but it's overkill for a project that will get a handful of hits, and you have to consider the timezones.

For a project this simple, I might even just go for a client-side render, especially since that would have let me add features like a custom date range filter much more easily.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

