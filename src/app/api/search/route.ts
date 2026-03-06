import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { query } = await req.json();

        if (!query || typeof query !== "string") {
            return NextResponse.json(
                { error: "Query is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("videos");

        // Try text search first (requires a text index on the collection)
        let results;
        try {
            results = await collection
                .find(
                    { $text: { $search: query } },
                    { projection: { score: { $meta: "textScore" } } }
                )
                .sort({ score: { $meta: "textScore" } })
                .limit(20)
                .toArray();

            // Normalize scores to 0-1 range
            if (results.length > 0) {
                const maxScore = Math.max(...results.map((r) => r.score || 1));
                results = results.map((r) => ({
                    ...r,
                    score: (r.score || 0) / maxScore,
                }));
            }
        } catch {
            // Fallback to regex search if text index doesn't exist
            const regex = new RegExp(
                query.split(/\s+/).filter(Boolean).join("|"),
                "i"
            );

            results = await collection
                .find({
                    $or: [
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                        { transcript: { $regex: regex } },
                    ],
                })
                .limit(20)
                .toArray();

            // Add a basic relevance score based on field matches
            results = results.map((r) => {
                let score = 0;
                const q = query.toLowerCase();
                if (r.title?.toLowerCase().includes(q)) score += 0.5;
                if (r.description?.toLowerCase().includes(q)) score += 0.3;
                if (r.transcript?.toLowerCase().includes(q)) score += 0.2;
                return { ...r, score: Math.min(score || 0.5, 1) };
            });

            results.sort(
                (a: { score: number }, b: { score: number }) => b.score - a.score
            );
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Search failed" },
            { status: 500 }
        );
    }
}
