import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const body = await request.json();
        const prompt = body.prompt as string;

        // Call OpenAI DALL-E API
        const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                model: "dall-e-3",
                n: 1,
                size: "1024x1024",
                quality: "standard"
            })
        });

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.json();
            console.error("OpenAI API error:", errorData);
            return NextResponse.json(
                { error: "Failed to generate image" },
                { status: openaiResponse.status }
            );
        }

        const openaiData = await openaiResponse.json();
        const imageUrl = openaiData.data[0].url;
        const revisedPrompt = openaiData.data[0].revised_prompt;

        // Download image and upload to ImgBB
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const base64String = Buffer.from(imageBuffer).toString("base64");

        const imgbbUrl = new URL("https://api.imgbb.com/1/upload");
        imgbbUrl.searchParams.append("key", process.env.IMGBB_API_KEY || "");
        imgbbUrl.searchParams.append("image", base64String);
        imgbbUrl.searchParams.append("expiration", "600");

        const imgbbResponse = await fetch(imgbbUrl.toString(), {
            method: "POST",
        });

        const imgbbData = await imgbbResponse.json();
        return NextResponse.json({
            ...imgbbData,
            revisedPrompt: revisedPrompt
        });
    } catch (error) {
        console.error("Error generating/uploading image:", error);
        return NextResponse.json(
            { error: "Failed to process image" },
            { status: 500 }
        );
    }
}