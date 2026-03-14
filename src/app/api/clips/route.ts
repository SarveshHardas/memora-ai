import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import clipModel from "@/model/Clip";
import "@/model/Video";

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();

        const clips = await clipModel
            .find({})
            .populate("video_id", "title description duration channel_id")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({ clips });
    } catch (error) {
        console.error("Clips fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch clips" },
            { status: 500 }
        );
    }
}
