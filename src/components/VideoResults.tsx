"use client";

import Image from "next/image";

export interface VideoResult {
    _id: string;
    title: string;
    description: string;
    transcript: string;
    thumbnailUrl: string;
    duration: string;
    createdAt: string;
    score?: number;
}

interface VideoResultsProps {
    results: VideoResult[];
    isSearching: boolean;
    hasSearched: boolean;
    query: string;
}

export default function VideoResults({
    results,
    isSearching,
    hasSearched,
    query,
}: VideoResultsProps) {
    if (isSearching) {
        return (
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="card !rounded-xl !p-0 overflow-hidden"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="h-40 bg-[var(--surface-hover)] animate-pulse" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-3/4 rounded bg-[var(--surface-hover)] animate-pulse" />
                                <div className="h-3 w-full rounded bg-[var(--surface-hover)] animate-pulse" />
                                <div className="h-3 w-1/2 rounded bg-[var(--surface-hover)] animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!hasSearched) {
        return (
            <div className="mt-12 flex flex-col items-center text-center animate-fadeInUp">
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 opacity-60"
                    style={{ background: "var(--gradient-primary)" }}
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    Search your <span className="gradient-text">video library</span>
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-md">
                    Type a natural language query to find specific moments across
                    all your videos. Memora AI understands context, not just
                    keywords.
                </p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="mt-10 flex flex-col items-center text-center animate-fadeInUp">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-[var(--surface-hover)] border border-[var(--border-color)]">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--muted)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">No results found</h3>
                <p className="text-sm text-[var(--muted)] max-w-sm">
                    No videos matched &quot;{query}&quot;. Try a different query or
                    upload more videos.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[var(--muted)]">
                    Found <span className="text-[var(--foreground)] font-semibold">{results.length}</span>{" "}
                    result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((video, idx) => (
                    <div
                        key={video._id}
                        className="card !rounded-xl !p-0 overflow-hidden group cursor-pointer animate-fadeInUp"
                        style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-[var(--surface-hover)] overflow-hidden">
                            <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                width={64}
                                height={64}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Duration badge */}
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                                {video.duration}
                            </div>

                            {/* Relevance score */}
                            {video.score !== undefined && (
                                <div
                                    className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-white text-xs font-semibold backdrop-blur-sm"
                                    style={{ background: "var(--gradient-primary)" }}
                                >
                                    {Math.round(video.score * 100)}% match
                                </div>
                            )}

                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="var(--primary)"
                                    >
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h4 className="font-semibold text-sm mb-1.5 line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                                {video.title}
                            </h4>
                            <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed mb-3">
                                {video.description}
                            </p>

                            {/* Transcript snippet */}
                            <div className="px-3 py-2 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)]">
                                <p className="text-xs text-[var(--muted)] italic line-clamp-2">
                                    &quot;...{video.transcript.substring(0, 120)}...&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-2 mt-3 text-xs text-[var(--muted)]">
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {new Date(video.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
