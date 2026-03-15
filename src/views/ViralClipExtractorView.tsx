"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface ExtractedClip {
    id: string;
    title: string;
    start_time: number;
    end_time: number;
    score: number;
}

interface VideoResult {
    title: string;
    description: string;
    duration: number;
    platform: string;
    embedUrl: string;
    thumbnailUrl: string;
    clips: ExtractedClip[];
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDuration(start: number, end: number): string {
    return formatTime(end - start);
}

function detectPlatform(url: string): string {
    if (/youtube\.com|youtu\.be/i.test(url)) return "YouTube";
    if (/twitter\.com|x\.com/i.test(url)) return "Twitter/X";
    if (/instagram\.com/i.test(url)) return "Instagram";
    if (/tiktok\.com/i.test(url)) return "TikTok";
    if (/facebook\.com|fb\.watch/i.test(url)) return "Facebook";
    return "Video";
}

function getPlatformColor(platform: string) {
    switch (platform) {
        case "YouTube":
            return { bg: "rgba(255,0,0,0.1)", color: "#ff0000", border: "rgba(255,0,0,0.25)" };
        case "Twitter/X":
            return { bg: "rgba(29,155,240,0.1)", color: "#1d9bf0", border: "rgba(29,155,240,0.25)" };
        case "Instagram":
            return { bg: "rgba(225,48,108,0.1)", color: "#e1306c", border: "rgba(225,48,108,0.25)" };
        case "TikTok":
            return { bg: "rgba(0,0,0,0.08)", color: "var(--foreground)", border: "var(--border-color)" };
        default:
            return { bg: "var(--surface-hover)", color: "var(--muted)", border: "var(--border-color)" };
    }
}

function getYouTubeEmbedUrl(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

function getMockResult(url: string): VideoResult {
    const platform = detectPlatform(url);
    const youtubeEmbed = getYouTubeEmbedUrl(url);

    return {
        title: "10 AI Tools That Will Blow Your Mind in 2026 🤯",
        description:
            "In this video, we explore the most groundbreaking AI tools that are reshaping content creation, productivity, and automation. From AI-powered video editing to intelligent content repurposing, these tools are changing how creators work. Whether you're a YouTuber, Instagram influencer, or TikTok creator, these tools will 10x your workflow.\n\n🔥 Tools covered: Memora AI, Runway ML, Descript, Opus Clip, Synthesia, ElevenLabs, Midjourney V6, Claude 4, Suno AI, and HeyGen.\n\n⏰ Timestamps:\n0:00 - Introduction\n1:30 - Memora AI\n4:15 - Runway ML\n7:00 - Descript\n9:45 - Opus Clip\n12:30 - Synthesia\n15:00 - ElevenLabs\n17:30 - Midjourney V6\n20:00 - Claude 4\n22:15 - Suno AI\n24:00 - HeyGen\n26:30 - Final Thoughts",
        duration: 1650,
        platform,
        embedUrl: youtubeEmbed || "",
        thumbnailUrl: "",
        clips: [
            { id: "clip-1", title: "🔥 Memora AI — The Ultimate Content Brain", start_time: 90, end_time: 255, score: 98 },
            { id: "clip-2", title: "Mind-Blowing AI Video Generation with Runway", start_time: 255, end_time: 420, score: 94 },
            { id: "clip-3", title: "Edit Videos Just By Editing Text — Descript", start_time: 420, end_time: 585, score: 91 },
            { id: "clip-4", title: "Auto-Extract Viral Clips with Opus Clip", start_time: 585, end_time: 750, score: 89 },
            { id: "clip-5", title: "AI Avatars That Look 100% Real — Synthesia", start_time: 750, end_time: 900, score: 87 },
            { id: "clip-6", title: "Clone Any Voice in Seconds — ElevenLabs", start_time: 900, end_time: 1050, score: 85 },
            { id: "clip-7", title: "Midjourney V6 Changes Everything for Thumbnails", start_time: 1050, end_time: 1200, score: 82 },
            { id: "clip-8", title: "Claude 4 — The Smartest AI Assistant Yet", start_time: 1200, end_time: 1335, score: 80 },
        ],
    };
}

function ViralClipExtractorInner() {
    const { data: session, status: authStatus } = useSession();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const [videoUrl, setVideoUrl] = useState("");
    const [isExtracting, setIsExtracting] = useState(false);
    const [result, setResult] = useState<VideoResult | null>(null);
    const [selectedClip, setSelectedClip] = useState<ExtractedClip | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // const handleExtract = useCallback(async () => {
    //     if (!videoUrl.trim()) return;
    //     setIsExtracting(true);
    //     setError(null);
    //     setResult(null);
    //     setSelectedClip(null);

    //     try {
    //         await new Promise((resolve) => setTimeout(resolve, 2200));
    //         const mockResult = getMockResult(videoUrl);
    //         setResult(mockResult);
    //         if (mockResult.clips.length > 0) {
    //             setSelectedClip(mockResult.clips[0]);
    //         }
    //     } catch {
    //         setError("Failed to extract video. Please check the URL and try again.");
    //     } finally {
    //         setIsExtracting(false);
    //     }
    // }, [videoUrl]);

    const handleExtract = useCallback(async () => {
        if (!videoUrl.trim()) return;

        setIsExtracting(true);
        setError(null);
        setResult(null);
        setSelectedClip(null);

        try {
            const res = await fetch("/api/extract-clips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: videoUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Extraction failed");
            }

            setResult(data);

            if (data.clips?.length > 0) {
                setSelectedClip(data.clips[0]);
            }
        } catch (err: any) {
            setError(err.message || "Failed to extract video");
        } finally {
            setIsExtracting(false);
        }
    }, [videoUrl]);

    const handleClipSelect = useCallback((clip: ExtractedClip) => {
        setSelectedClip(clip);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleExtract();
        },
        [handleExtract]
    );

    if (authStatus === "loading") {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: "var(--gradient-hero)" }}
            >
                <div className="animate-fadeInUp flex flex-col items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: "var(--gradient-primary)" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (!session) return null;
    const user = session.user;

    return (
        <div
            className="min-h-screen relative"
            style={{ background: "var(--gradient-hero)" }}
        >
            {/* Background decorations */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 animate-pulseGlow pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 animate-pulseGlow pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
                    animationDelay: "1.5s",
                }}
            />

            {/* Top navigation bar */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                >
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ background: "var(--gradient-primary)" }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        Memora <span className="gradient-text">AI</span>
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-200 cursor-pointer shadow-sm"
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        )}
                    </button>

                    <div className="flex items-center gap-2">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "Profile"}
                                className="w-10 h-10 rounded-xl object-cover border border-[var(--border-color)]"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                                style={{ background: "var(--gradient-primary)" }}
                            >
                                {user?.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                        )}

                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-red-400 hover:text-red-500 transition-all duration-200 cursor-pointer shadow-sm"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            <span className="hidden sm:inline">Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 md:pt-6 pb-16">
                {/* Header */}
                <div className="animate-fadeInUp mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Viral Clip <span className="gradient-text">Extractor</span>
                    </h1>
                    <p className="text-[var(--muted)] text-sm mt-1">
                        Paste any video link and extract the most viral-worthy clips instantly
                    </p>
                </div>

                {/* URL Input Card */}
                <div
                    className="animate-fadeInUp mb-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] p-5 md:p-6 shadow-sm"
                    style={{ animationDelay: "0.1s" }}
                >
                    <label className="block text-sm font-semibold mb-3 text-[var(--foreground)]">
                        <span className="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            Video URL
                        </span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <input
                                ref={inputRef}
                                id="video-url-input"
                                type="url"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="https://www.youtube.com/watch?v=... or any video link"
                                className="w-full bg-[var(--surface-hover)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 pr-10"
                            />
                            {videoUrl && (
                                <button
                                    onClick={() => { setVideoUrl(""); inputRef.current?.focus(); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all duration-200 cursor-pointer"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button
                            id="extract-btn"
                            onClick={handleExtract}
                            disabled={!videoUrl.trim() || isExtracting}
                            className="btn-primary !py-3.5 !px-8 !rounded-xl !text-sm justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none"
                        >
                            {isExtracting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Extracting...
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                    Extract Clips
                                </>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-[10px] text-[var(--muted)] uppercase tracking-wider font-semibold">Supported:</span>
                        {["YouTube", "Twitter/X", "Instagram", "TikTok", "Facebook"].map((p) => (
                            <span
                                key={p}
                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-medium border"
                                style={{
                                    background: getPlatformColor(p).bg,
                                    color: getPlatformColor(p).color,
                                    borderColor: getPlatformColor(p).border,
                                }}
                            >
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Extracting skeleton */}
                {isExtracting && (
                    <div className="flex flex-col lg:flex-row gap-6 animate-fadeInUp">
                        <div className="flex-1 lg:flex-[1.8]">
                            <div className="rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border-color)]">
                                <div className="aspect-video bg-[var(--surface-hover)] animate-pulse flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                                        <p className="text-sm text-[var(--muted)] font-medium">Analyzing video for viral moments...</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-3/4 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                    <div className="h-4 w-1/2 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                    <div className="h-20 w-full rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <div className="lg:flex-1 space-y-3">
                            <div className="h-8 w-40 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] animate-pulse" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !isExtracting && (
                    <div className="animate-fadeInUp flex flex-col items-center text-center py-20">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-red-500/10 border border-red-500/20">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{error}</h3>
                        <button
                            onClick={() => { setError(null); inputRef.current?.focus(); }}
                            className="btn-primary !py-2.5 !px-6 !rounded-xl !text-sm mt-3"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty / initial state */}
                {!isExtracting && !error && !result && (
                    <div className="animate-fadeInUp flex flex-col items-center text-center py-16" style={{ animationDelay: "0.2s" }}>
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 opacity-60"
                            style={{ background: "var(--gradient-primary)" }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            Paste a video <span className="gradient-text">link</span> to begin
                        </h3>
                        <p className="text-sm text-[var(--muted)] max-w-md">
                            Drop any YouTube, Twitter, Instagram, or TikTok video URL above and we&#39;ll identify the most viral-worthy clips for you.
                        </p>
                    </div>
                )}

                {/* Results: Two-column layout */}
                {!isExtracting && !error && result && selectedClip && (
                    <div className="flex flex-col lg:flex-row gap-6 animate-fadeInUp">
                        {/* LEFT COLUMN: Video Player + Details */}
                        <div className="flex-1 lg:flex-[1.8] min-w-0">
                            {/* Video Player */}
                            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
                                {result.embedUrl ? (
                                    <iframe
                                        className="w-full aspect-video"
                                        src={result.embedUrl}
                                        title={result.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center bg-[var(--surface)]">
                                        <div className="flex flex-col items-center gap-3 px-6 text-center">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                                                <polygon points="23 7 16 12 23 17 23 7" />
                                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                            </svg>
                                            <p className="text-sm text-[var(--muted)]">
                                                Direct embed not available for this platform.
                                                <br />
                                                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline mt-1 inline-block">
                                                    Open original video ↗
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Video Details */}
                            <div className="mt-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] p-5 md:p-6 shadow-sm">
                                {/* Title + Platform */}
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                    <h2 className="text-lg md:text-xl font-bold leading-tight flex-1 min-w-0">
                                        {result.title}
                                    </h2>
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                                        style={{
                                            background: getPlatformColor(result.platform).bg,
                                            color: getPlatformColor(result.platform).color,
                                            border: `1px solid ${getPlatformColor(result.platform).border}`,
                                        }}
                                    >
                                        {result.platform}
                                    </span>
                                </div>

                                {/* Metadata chips */}
                                <div className="flex flex-wrap items-center gap-2 mb-5">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        Duration: {formatTime(result.duration)}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                            <line x1="7" y1="2" x2="7" y2="22" />
                                            <line x1="17" y1="2" x2="17" y2="22" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                        </svg>
                                        {result.clips.length} clips found
                                    </div>
                                    {selectedClip && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                            </svg>
                                            Virality: {selectedClip.score}%
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-[var(--border-color)] mb-5" />

                                {/* Selected clip info */}
                                {selectedClip && (
                                    <div className="mb-5 p-4 rounded-xl border border-[var(--primary)]/20" style={{ background: "rgba(79,70,229,0.04)" }}>
                                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-[var(--primary)]">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                                <line x1="7" y1="2" x2="7" y2="22" />
                                                <line x1="17" y1="2" x2="17" y2="22" />
                                                <line x1="2" y1="12" x2="22" y2="12" />
                                            </svg>
                                            Selected Clip
                                        </h3>
                                        <p className="text-sm font-medium mb-1">{selectedClip.title}</p>
                                        <p className="text-xs text-[var(--muted)]">
                                            {formatTime(selectedClip.start_time)} – {formatTime(selectedClip.end_time)} · Duration: {formatDuration(selectedClip.start_time, selectedClip.end_time)}
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                {result.description && (
                                    <div>
                                        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="17" y1="10" x2="3" y2="10" />
                                                <line x1="21" y1="6" x2="3" y2="6" />
                                                <line x1="21" y1="14" x2="3" y2="14" />
                                                <line x1="17" y1="18" x2="3" y2="18" />
                                            </svg>
                                            Description
                                        </h3>
                                        <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                                            {result.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Clips Sidebar */}
                        <div className="lg:flex-1 min-w-0 lg:max-w-[420px]">
                            <div className="lg:sticky lg:top-4">
                                {/* Sidebar header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-base font-bold flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                        </svg>
                                        Viral Clips
                                    </h3>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "var(--gradient-primary)", color: "white" }}>
                                        {result.clips.length}
                                    </span>
                                </div>

                                {/* Clips list */}
                                <div className="clips-sidebar space-y-2.5 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2">
                                    {result.clips.map((clip, idx) => {
                                        const isActive = selectedClip?.id === clip.id;

                                        return (
                                            <div
                                                key={clip.id}
                                                onClick={() => handleClipSelect(clip)}
                                                className="group flex gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 animate-fadeInUp"
                                                style={{
                                                    animationDelay: `${idx * 0.05}s`,
                                                    background: "var(--surface)",
                                                    borderColor: isActive ? "var(--primary)" : "var(--border-color)",
                                                    boxShadow: isActive
                                                        ? "0 0 20px rgba(79,70,229,0.15), var(--shadow-card)"
                                                        : "var(--shadow-card)",
                                                }}
                                            >
                                                {/* Clip thumbnail / preview */}
                                                <div className="relative w-[140px] h-[80px] shrink-0 rounded-lg overflow-hidden bg-[var(--surface-hover)]">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-40 group-hover:opacity-70 transition-opacity">
                                                            <polygon points="5 3 19 12 5 21 5 3" fill="var(--primary)" />
                                                        </svg>
                                                    </div>

                                                    {/* Duration badge */}
                                                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-black/70 text-white backdrop-blur-sm">
                                                        {formatDuration(clip.start_time, clip.end_time)}
                                                    </div>

                                                    {/* Score badge */}
                                                    <div
                                                        className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                                                        style={{
                                                            background: clip.score >= 90
                                                                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                                                                : clip.score >= 80
                                                                    ? "linear-gradient(135deg, #eab308, #ca8a04)"
                                                                    : "linear-gradient(135deg, #64748b, #475569)",
                                                        }}
                                                    >
                                                        {clip.score}%
                                                    </div>

                                                    {/* Active indicator */}
                                                    {isActive && (
                                                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white" style={{ background: "var(--gradient-primary)" }}>
                                                            NOW
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Clip info */}
                                                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                                    <div>
                                                        <h4 className={`text-sm font-semibold line-clamp-2 leading-snug transition-colors ${isActive ? "text-[var(--primary)]" : "group-hover:text-[var(--primary)]"}`}>
                                                            {clip.title}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span
                                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                            style={{
                                                                background: "rgba(34,197,94,0.15)",
                                                                color: "#22c55e",
                                                                border: "1px solid rgba(34,197,94,0.3)",
                                                            }}
                                                        >
                                                            Viral
                                                        </span>
                                                        <span className="text-[10px] text-[var(--muted)]">
                                                            {formatTime(clip.start_time)} – {formatTime(clip.end_time)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Dashboard link */}
                <div className="text-center mt-10">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 cursor-pointer"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Dashboard
                    </button>
                </div>
            </main>
        </div>
    );
}

export default function ViralClipExtractorView() {
    return <ViralClipExtractorInner />;
}
