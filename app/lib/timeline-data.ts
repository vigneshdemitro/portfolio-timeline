import type { TimelineData } from '../types';

// Fallback ensures the app works even if the env var isn't exposed at edge runtime
const DATA_URL =
  process.env.TIMELINE_DATA_URL ??
  'https://raw.githubusercontent.com/vigneshdemitro/portfolio-data/main/timeline.json';

export async function getTimelineData(): Promise<TimelineData> {
  const res = await fetch(DATA_URL, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch timeline data: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<TimelineData>;
}
