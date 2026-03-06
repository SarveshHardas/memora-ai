import { MongoClient } from "mongodb";

const SAMPLE_VIDEOS = [
    {
        title: "Setting Up NextAuth in Next.js 15 - Complete Guide",
        description:
            "A deep dive into setting up NextAuth.js v5 with Google OAuth, MongoDB adapter, and JWT sessions in a Next.js 15 app.",
        transcript:
            "Today we're going to set up NextAuth in our Next.js 15 application. First, we need to install the packages - next-auth and the mongodb adapter. Let me show you how to configure the Google OAuth provider, set up the MongoDB adapter, and handle JWT sessions properly. We'll also cover custom sign-in pages and callback URLs.",
        thumbnailUrl: "https://img.youtube.com/vi/w2h54xz6Ndw/maxresdefault.jpg",
        duration: "24:15",
        createdAt: new Date("2026-02-15"),
    },
    {
        title: "Building a Viral Content Engine with AI",
        description:
            "How to use AI to analyze trending content, extract viral clips, and optimize your social media posting schedule.",
        transcript:
            "The secret to going viral is not luck, it's data. In this video, I'll show you how we built Memora AI to analyze thousands of trending videos, identify common patterns in viral content, and automatically extract the most engaging moments from your long-form videos. We use natural language processing to understand the emotional peaks in your content.",
        thumbnailUrl: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
        duration: "18:42",
        createdAt: new Date("2026-02-20"),
    },
    {
        title: "MongoDB Atlas Full Tutorial - From Zero to Production",
        description:
            "Complete walkthrough of MongoDB Atlas setup, cluster configuration, network access, database design, and deployment best practices.",
        transcript:
            "Welcome to the complete MongoDB Atlas tutorial. We'll start by creating a free cluster, then configure network access and database users. I'll show you how to design your schemas, create indexes for better performance, and set up MongoDB Atlas search for full-text search capabilities. We'll also cover connection strings and SSL configuration.",
        thumbnailUrl: "https://img.youtube.com/vi/084rmLU1UgA/maxresdefault.jpg",
        duration: "31:20",
        createdAt: new Date("2026-01-10"),
    },
    {
        title: "React Hooks Deep Dive - useState, useEffect, and Custom Hooks",
        description:
            "Master React hooks with practical examples. Covers useState, useEffect, useRef, useCallback, useMemo, and building your own custom hooks.",
        transcript:
            "React hooks changed the way we write components. Let me walk you through each hook starting with useState for managing local state, useEffect for side effects and lifecycle events, and useRef for DOM access. Then we'll build custom hooks like useDebounce and useLocalStorage that you can reuse across projects. Understanding these patterns will make your React code much cleaner.",
        thumbnailUrl: "https://img.youtube.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
        duration: "42:08",
        createdAt: new Date("2026-01-25"),
    },
    {
        title: "TailwindCSS v4 - What's New and Migration Guide",
        description:
            "Everything new in TailwindCSS v4 including the new engine, CSS-first configuration, and step-by-step migration from v3.",
        transcript:
            "TailwindCSS v4 is a complete rewrite with an all-new engine that's up to 10x faster. The biggest change is the move to CSS-first configuration using the @theme directive instead of the JavaScript config file. Let me show you how to migrate your existing project, the new color system, and some exciting new utilities that weren't possible before.",
        thumbnailUrl: "https://img.youtube.com/vi/6biMfOsmEUo/maxresdefault.jpg",
        duration: "15:33",
        createdAt: new Date("2026-03-01"),
    },
    {
        title: "API Design Patterns - REST vs GraphQL vs tRPC",
        description:
            "Comparing modern API design approaches with real-world examples. When to use REST, GraphQL, or tRPC in your full-stack applications.",
        transcript:
            "Choosing the right API design pattern is critical for your application's success. REST is the industry standard and works great for simple CRUD operations. GraphQL shines when you have complex data relationships and need to minimize over-fetching. tRPC is the new kid on the block, offering end-to-end type safety with zero boilerplate. Let me compare all three with actual code examples.",
        thumbnailUrl: "https://img.youtube.com/vi/PY_TIIl1XiY/maxresdefault.jpg",
        duration: "27:45",
        createdAt: new Date("2026-02-08"),
    },
];

async function seed() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ MONGODB_URI not set in environment");
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db();
        const collection = db.collection("videos");

        // Clear existing videos
        const deleteResult = await collection.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing videos`);

        // Insert sample videos
        const insertResult = await collection.insertMany(SAMPLE_VIDEOS);
        console.log(
            `📹 Inserted ${insertResult.insertedCount} sample videos`
        );

        // Create text index for search
        try {
            await collection.createIndex(
                { title: "text", description: "text", transcript: "text" },
                { name: "video_text_search" }
            );
            console.log("🔍 Created text search index");
        } catch (e: unknown) {
            const error = e as { codeName?: string };
            if (error.codeName === "IndexOptionsConflict") {
                console.log("🔍 Text search index already exists");
            } else {
                throw e;
            }
        }

        console.log("\n🎉 Seed complete! Sample videos are ready for search.");
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

seed();
