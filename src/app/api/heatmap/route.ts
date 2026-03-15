import { NextResponse } from "next/server";
import { getHeatmap } from "@/lib/getMostViewed";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  const heatmap = await getHeatmap(videoId);

  return NextResponse.json({ heatmap });
}