import { cacheLife } from 'next/cache'

export type APOD = {
  date: string
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: 'image' | 'video'
  copyright?: string
}

export async function getRecentAPODs(): Promise<APOD[]> {
  'use cache'
  cacheLife('days')

  const apiKey = process.env.NASA_API_KEY
  if (!apiKey) throw new Error('NASA_API_KEY is not set')

  const end_date = new Date();
  const start_date = new Date();
  start_date.setDate(start_date.getDate() - 9);

  const queryParams = new URLSearchParams({ api_key: apiKey, start_date: start_date.toLocaleDateString('en-CA'), end_date: end_date.toLocaleDateString('en-CA') });

  const res = await fetch(`https://api.nasa.gov/planetary/apod?${queryParams.toString()}`)

  if (!res.ok) throw new Error(`NASA API error: ${res.status}`)
  return res.json()
}

export async function getAPODByDate({
  start_date,
  end_date,
}: {
  start_date: string
  end_date: string
}): Promise<APOD[]> {
  'use cache'
  cacheLife('days')

  const apiKey = process.env.NASA_API_KEY
  if (!apiKey) throw new Error('NASA_API_KEY is not set')

  const queryParams = new URLSearchParams({ api_key: apiKey, start_date, end_date })

  const res = await fetch(`https://api.nasa.gov/planetary/apod?${queryParams.toString()}`)

  if (!res.ok) throw new Error(`NASA API error: ${res.status}`)
  return res.json()
}

export async function getAPOD(date: string): Promise<APOD> {
  'use cache'
  cacheLife('days')

  const apiKey = process.env.NASA_API_KEY
  if (!apiKey) throw new Error('NASA_API_KEY is not set')

  const queryParams = new URLSearchParams({ api_key: apiKey, date })

  const res = await fetch(`https://api.nasa.gov/planetary/apod?${queryParams.toString()}`)

  if (!res.ok) throw new Error(`NASA API error: ${res.status}`)
  return res.json()
}
