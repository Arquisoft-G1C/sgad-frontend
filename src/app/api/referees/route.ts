/**
 * Referees API Route
 * Client-side endpoint for fetching referees data
 */

import { NextResponse } from "next/server";
import { getRefereesServer } from "@/lib/server-api";

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
    };

    const referees = await getRefereesServer(params);

    return NextResponse.json(referees);
  } catch (error) {
    console.error("Error fetching referees:", error);
    return NextResponse.json(
      { error: "Failed to fetch referees" },
      { status: 500 }
    );
  }
}
