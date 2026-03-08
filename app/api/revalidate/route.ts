// 🔑 Next.js concept: Route Handlers (app/api/**/route.ts)
// These are API endpoints in the App Router — replaces the old pages/api/ folder.
// This endpoint clears the 'timeline' fetch cache on demand.
//
// How to trigger:
//   curl -X POST "https://timeline.vigneshdemitro.work/api/revalidate?secret=YOUR_SECRET"
//
// After you push new data to portfolio-data repo → hit this endpoint
// → Next.js clears the cache → next page visit fetches fresh data instantly.

import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Protect the endpoint — only allow requests with the correct secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Clears the cached page + all its fetches — triggers a fresh fetch
  // on the next page visit
  // Note: revalidateTag API changed in Next.js 16, using revalidatePath instead
  revalidatePath('/');

  return NextResponse.json({
    revalidated: true,
    message: 'Timeline cache cleared. Fresh data on next visit.',
    timestamp: new Date().toISOString(),
  });
}
