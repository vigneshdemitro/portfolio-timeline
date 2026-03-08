export const runtime = 'edge';

// On Cloudflare Pages (Edge runtime), revalidatePath/revalidateTag from next/cache
// are not supported. Content stays fresh because timeline-data.ts uses cache: 'no-store'.
// This endpoint is kept for compatibility — it just returns a confirmation response.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  return NextResponse.json({
    revalidated: true,
    message: 'Data is fetched fresh on every request (no-store). No cache to clear.',
    timestamp: new Date().toISOString(),
  });
}
