import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/utils/helpers';

// TODO handle unhappy path
export async function GET({ nextUrl }: NextRequest) {
  const res = await fetch(
    buildApiUrl(
      "v3/lab_tests/markers",
      {
        pageParam: nextUrl.searchParams.get("page") || 1,
        name: nextUrl.searchParams.get("name"),
      },
      `https://api.sandbox.${process.env.VITAL_API_REGION}.tryvital.io`
    ),
    {
      method: "GET",
      // @ts-expect-error
      headers: { "x-vital-api-key": process.env.VITAL_API_KEY },
    }
  );
  const output = await res.json();
  // For testing error handling
  // return NextResponse.error();
  return NextResponse.json(output);
}
