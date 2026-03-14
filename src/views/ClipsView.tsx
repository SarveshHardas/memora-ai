"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface PopulatedVideo {
    _id: string;
    title: string;
    description: string;
    duration: number;
    channel_id: string;
}

interface ClipData {
    _id: string;
    video_id: PopulatedVideo;
    start_time: number;
    end_time: number;
    video_url: string;
    status: "generating" | "ready" | "failed";
    createdAt: string;
    updatedAt: string;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDuration(start: number, end: number): string {
    const dur = end - start;
    return formatTime(dur);
}

function getStatusConfig(status: string) {
    switch (status) {
        case "ready":
            return { label: "Ready", bg: "rgba(34,197,94,0.15)", color: "#22c55e", border: "rgba(34,197,94,0.3)" };
        case "generating":
            return { label: "Generating", bg: "rgba(234,179,8,0.15)", color: "#eab308", border: "rgba(234,179,8,0.3)" };
        case "failed":
            return { label: "Failed", bg: "rgba(239,68,68,0.15)", color: "#ef4444", border: "rgba(239,68,68,0.3)" };
        default:
            return { label: status, bg: "var(--surface-hover)", color: "var(--muted)", border: "var(--border-color)" };
    }
}

function ClipsViewInner() {
    const { data: session, status: authStatus } = useSession();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const [clips, setClips] = useState<ClipData[]>([]);
    const [selectedClip, setSelectedClip] = useState<ClipData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const fetchClips = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch("/api/clips");
            if (!res.ok) throw new Error("Failed to fetch clips");
            const data = await res.json();
            const fetchedClips: ClipData[] = data.clips || [];
            setClips(fetchedClips);
            if (fetchedClips.length > 0) {
                setSelectedClip(fetchedClips[0]);
            }
        } catch (err) {
            console.error("Error fetching clips:", err);
            setError("Failed to load clips. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (authStatus === "authenticated") {
            fetchClips();
        }
    }, [authStatus, fetchClips]);

    useEffect(() => {
        if (videoRef.current && selectedClip) {
            videoRef.current.load();
        }
    }, [selectedClip]);

    const handleClipSelect = useCallback((clip: ClipData) => {
        setSelectedClip(clip);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

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
                        Generated <span className="gradient-text">Clips</span>
                    </h1>
                    <p className="text-[var(--muted)] text-sm mt-1">
                        Browse and play your AI-generated video clips
                    </p>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex flex-col lg:flex-row gap-6 animate-fadeInUp">
                        {/* Left skeleton */}
                        <div className="flex-1 lg:flex-[1.8]">
                            <div className="rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border-color)]">
                                <div className="aspect-video bg-[var(--surface-hover)] animate-pulse" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 w-3/4 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                    <div className="h-4 w-1/2 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                    <div className="h-20 w-full rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                                </div>
                            </div>
                        </div>
                        {/* Right skeleton */}
                        <div className="lg:flex-1 space-y-3">
                            <div className="h-8 w-32 rounded-lg bg-[var(--surface-hover)] animate-pulse" />
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] animate-pulse" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !isLoading && (
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
                            onClick={fetchClips}
                            className="btn-primary !py-2.5 !px-6 !rounded-xl !text-sm mt-3"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && !error && clips.length === 0 && (
                    <div className="animate-fadeInUp flex flex-col items-center text-center py-20">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 opacity-60"
                            style={{ background: "var(--gradient-primary)" }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                <line x1="7" y1="2" x2="7" y2="22" />
                                <line x1="17" y1="2" x2="17" y2="22" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <line x1="2" y1="7" x2="7" y2="7" />
                                <line x1="2" y1="17" x2="7" y2="17" />
                                <line x1="17" y1="17" x2="22" y2="17" />
                                <line x1="17" y1="7" x2="22" y2="7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                            No clips <span className="gradient-text">yet</span>
                        </h3>
                        <p className="text-sm text-[var(--muted)] max-w-md">
                            Your AI-generated clips will appear here. Search for videos and generate clips to get started.
                        </p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="btn-primary !py-3 !px-6 !rounded-xl !text-sm mt-6"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search Videos
                        </button>
                    </div>
                )}

                {/* Main two-column layout */}
                {!isLoading && !error && clips.length > 0 && selectedClip && (
                    <div className="flex flex-col lg:flex-row gap-6 animate-fadeInUp">
                        {/* LEFT COLUMN: Video Player + Details */}
                        <div className="flex-1 lg:flex-[1.8] min-w-0">
                            {/* Video Player */}
                            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
                                {selectedClip.status === "ready" ? (
                                    <video
                                        ref={videoRef}
                                        className="w-full aspect-video object-contain bg-black"
                                        controls
                                        autoPlay
                                        playsInline
                                        key={selectedClip._id}
                                    >
                                        <source src={selectedClip.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center bg-[var(--surface)]">
                                        <div className="flex flex-col items-center gap-3">
                                            {selectedClip.status === "generating" ? (
                                                <>
                                                    <div className="w-12 h-12 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-sm text-[var(--muted)]">Generating clip...</p>
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="15" y1="9" x2="9" y2="15" />
                                                        <line x1="9" y1="9" x2="15" y2="15" />
                                                    </svg>
                                                    <p className="text-sm text-[var(--muted)]">Clip generation failed</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Clip Details */}
                            <div className="mt-4 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] p-5 md:p-6 shadow-sm">
                                {/* Title + Status */}
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                    <h2 className="text-lg md:text-xl font-bold leading-tight flex-1 min-w-0">
                                        {selectedClip.video_id?.title || "Untitled Clip"}
                                    </h2>
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                                        style={{
                                            background: getStatusConfig(selectedClip.status).bg,
                                            color: getStatusConfig(selectedClip.status).color,
                                            border: `1px solid ${getStatusConfig(selectedClip.status).border}`,
                                        }}
                                    >
                                        {selectedClip.status === "generating" && (
                                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: getStatusConfig(selectedClip.status).color }} />
                                        )}
                                        {getStatusConfig(selectedClip.status).label}
                                    </span>
                                </div>

                                {/* Metadata chips */}
                                <div className="flex flex-wrap items-center gap-2 mb-5">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        {formatTime(selectedClip.start_time)} – {formatTime(selectedClip.end_time)}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                        Duration: {formatDuration(selectedClip.start_time, selectedClip.end_time)}
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-xs font-medium text-[var(--muted)]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        {new Date(selectedClip.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-[var(--border-color)] mb-5" />

                                {/* Description */}
                                {selectedClip.video_id?.description && (
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
                                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                                            {selectedClip.video_id.description}
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
                                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                                            <line x1="7" y1="2" x2="7" y2="22" />
                                            <line x1="17" y1="2" x2="17" y2="22" />
                                            <line x1="2" y1="12" x2="22" y2="12" />
                                            <line x1="2" y1="7" x2="7" y2="7" />
                                            <line x1="2" y1="17" x2="7" y2="17" />
                                            <line x1="17" y1="17" x2="22" y2="17" />
                                            <line x1="17" y1="7" x2="22" y2="7" />
                                        </svg>
                                        All Clips
                                    </h3>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "var(--gradient-primary)", color: "white" }}>
                                        {clips.length}
                                    </span>
                                </div>

                                {/* Clips list */}
                                <div className="clips-sidebar space-y-2.5 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2">
                                    {clips.map((clip, idx) => {
                                        const isActive = selectedClip._id === clip._id;
                                        const statusConf = getStatusConfig(clip.status);

                                        return (
                                            <div
                                                key={clip._id}
                                                onClick={() => handleClipSelect(clip)}
                                                className="group flex gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 animate-fadeInUp"
                                                style={{
                                                    animationDelay: `${idx * 0.05}s`,
                                                    background: isActive ? "var(--surface)" : "var(--surface)",
                                                    borderColor: isActive ? "var(--primary)" : "var(--border-color)",
                                                    boxShadow: isActive
                                                        ? "0 0 20px rgba(79,70,229,0.15), var(--shadow-card)"
                                                        : "var(--shadow-card)",
                                                }}
                                            >
                                                {/* Clip thumbnail / preview */}
                                                <div className="relative w-[140px] h-[80px] shrink-0 rounded-lg overflow-hidden bg-[var(--surface-hover)]">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        {clip.status === "ready" ? (
                                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-40 group-hover:opacity-70 transition-opacity">
                                                                <polygon points="5 3 19 12 5 21 5 3" fill="var(--primary)" />
                                                            </svg>
                                                        ) : clip.status === "generating" ? (
                                                            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" className="opacity-40">
                                                                <circle cx="12" cy="12" r="10" />
                                                                <line x1="15" y1="9" x2="9" y2="15" />
                                                                <line x1="9" y1="9" x2="15" y2="15" />
                                                            </svg>
                                                        )}
                                                    </div>

                                                    {/* Duration badge */}
                                                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-black/70 text-white backdrop-blur-sm">
                                                        {formatDuration(clip.start_time, clip.end_time)}
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
                                                            {clip.video_id?.title || "Untitled"}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span
                                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                                            style={{
                                                                background: statusConf.bg,
                                                                color: statusConf.color,
                                                                border: `1px solid ${statusConf.border}`,
                                                            }}
                                                        >
                                                            {statusConf.label}
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

export default function ClipsView() {
    return <ClipsViewInner />;
}
