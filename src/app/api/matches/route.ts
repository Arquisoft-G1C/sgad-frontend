/**
 * Matches API Route
 * Client-side endpoint for fetching matches data
 */

import { NextResponse } from "next/server";
import { getMatchesServer } from "@/lib/server-api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const params = {
      skip: searchParams.get("skip")
        ? parseInt(searchParams.get("skip")!)
        : undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : undefined,
      referee_id: searchParams.get("referee_id")
        ? parseInt(searchParams.get("referee_id")!)
        : undefined,
    };

    const matches = await getMatchesServer(params);

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
