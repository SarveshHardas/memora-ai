import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeTimestamp } from "@/lib/getMostViewed";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const videoUrl = body.videoUrl as string;

        if (!videoUrl) {
            return NextResponse.json(
                { error: "videoUrl is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        const prompt = `
        Given this YouTube video URL: ${videoUrl}
        
        Analyze the video and determine:
        1. The timestamp (in seconds) of the most viewed/engaging part of the video
        2. Why that moment is likely the most viewed
        
        Return your response in JSON format:
        {
            "timestamp": <number in seconds>,
            "reason": "<explanation>"
        }
        
        Only return valid JSON, no other text.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Parse the JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        console.log("Gemini response:", responseText);
        if (!jsonMatch) {
            return NextResponse.json(
                { error: "Failed to parse Gemini response" },
                { status: 500 }
            );
        }

        const parsedResponse = JSON.parse(jsonMatch[0]);
        const timestamp = parsedResponse.timestamp;

        // Get additional analysis of the timestamp
        const timestampAnalysis = await analyzeTimestamp(timestamp);

        return NextResponse.json({
            timestamp: timestamp,
            reason: parsedResponse.reason,
            timestampFormatted: formatTimestamp(timestamp),
            analysis: timestampAnalysis
        });
    } catch (error) {
        console.error("Error analyzing video:", error);
        return NextResponse.json(
            { error: "Failed to analyze video" },
            { status: 500 }
        );
    }
}

function formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
