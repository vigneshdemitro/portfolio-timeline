import type { TimelineData } from '../types';

const DATA_URL =
  import.meta.env.VITE_TIMELINE_DATA_URL ??
  'https://raw.githubusercontent.com/vigneshdemitro/portfolio-data/main/timeline.json';

export async function getTimelineData(): Promise<TimelineData> {
  const res = await fetch(DATA_URL);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch timeline data: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<TimelineData>;
}
