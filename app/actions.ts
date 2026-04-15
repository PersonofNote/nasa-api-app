'use server';

import { getAPODByDate, type APOD } from './lib/apod';

export async function fetchAPODs(
  startDate: string,
  endDate: string,
): Promise<APOD[]> {
  return getAPODByDate({ start_date: startDate, end_date: endDate });
}
