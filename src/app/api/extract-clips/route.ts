import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { url } = await req.json();

    try {

        const res = await fetch("http://localhost:8000/extract", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();

        return NextResponse.json(data);

    } catch (err) {
        return NextResponse.json(
            { error: "Extraction service failed" },
            { status: 500 }
        );
    }
}