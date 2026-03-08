import type { TimelineData } from '../types';

export async function getTimelineData(): Promise<TimelineData> {
  const url = process.env.TIMELINE_DATA_URL;

  if (!url) {
    throw new Error(
      'TIMELINE_DATA_URL is not set. Add it to your .env.local file.'
    );
  }

  const res = await fetch(url, {
    next: {
      revalidate: 3600, // ISR: auto re-fetch every hour as fallback
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch timeline data: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<TimelineData>;
}
