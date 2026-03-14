import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const body = await request.json();
        const prompt = body.prompt as string;
        const response = await fetch("http://localhost:8000/generate-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });

        const imageBuffer = await response.arrayBuffer();
        const base64String = Buffer.from(imageBuffer).toString("base64");
        const imgbbUrl = new URL(`expiration=600&key=${process.env.IMGBB_API_KEY}`);
        imgbbUrl.searchParams.append("key", process.env.IMGBB_API_KEY || "");
        imgbbUrl.searchParams.append("image", base64String);

        const imgbbResponse = await fetch(imgbbUrl.toString(), {
            method: "POST",
        });

        const imgbbData = await imgbbResponse.json();
        return NextResponse.json(imgbbData);
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
            { error: "Failed to process image" },
            { status: 500 }
        );
    }
}