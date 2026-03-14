"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";
import SearchBar from "@/components/SearchBar";
import VideoResults, { VideoResult } from "@/components/VideoResults";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const [results, setResults] = useState<VideoResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [lastQuery, setLastQuery] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    const handleSearch = useCallback(async (query: string) => {
        setIsSearching(true);
        setHasSearched(true);
        setLastQuery(query);

        try {
            const res = await fetch("/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!res.ok) throw new Error("Search failed");

            const data = await res.json();
            setResults(data.results || []);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    if (status === "loading") {
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
                <div className="flex items-center gap-3">
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

                    {/* User avatar + sign out */}
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
            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-8 md:pt-14 pb-16">
                {/* Welcome + Search section */}
                <div className="animate-fadeInUp">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                            Welcome back,{" "}
                            <span className="gradient-text">
                                {user?.name?.split(" ")[0] || "User"}
                            </span>
                        </h1>
                        <p className="text-[var(--muted)] text-sm md:text-base">
                            Search across your video library with natural language
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="max-w-3xl mx-auto">
                        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
                    </div>
                </div>

                {/* Video results */}
                <div className="max-w-5xl mx-auto mt-2">
                    <VideoResults
                        results={results}
                        isSearching={isSearching}
                        hasSearched={hasSearched}
                        query={lastQuery}
                    />
                </div>

                {/* AI Tools navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                    <div
                        onClick={() => router.push("/generate?tab=thumbnail")}
                        className="card !rounded-2xl !p-6 group cursor-pointer hover:!border-[var(--primary)]"
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                                style={{ background: "var(--gradient-primary)" }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-bold mb-1">
                                    Thumbnail <span className="gradient-text">Generator</span>
                                </h3>
                                <p className="text-xs text-[var(--muted)] leading-relaxed">
                                    Create eye-catching thumbnails with AI using text prompts and reference images
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Get started
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>

                    <div
                        onClick={() => router.push("/generate?tab=caption")}
                        className="card !rounded-2xl !p-6 group cursor-pointer hover:!border-[var(--secondary)]"
                    >
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                                style={{ background: "linear-gradient(135deg, #7c3aed, #c084fc)" }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-bold mb-1">
                                    Caption <span style={{ background: "linear-gradient(135deg, #7c3aed, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generator</span>
                                </h3>
                                <p className="text-xs text-[var(--muted)] leading-relaxed">
                                    Generate viral captions tailored for any platform and tone
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[var(--secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Get started
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Stats cards (bottom) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                    <div className="card !rounded-xl !p-6 text-center group hover:!border-[var(--primary)]">
                        <div className="text-3xl font-bold gradient-text mb-1">0</div>
                        <div className="text-sm text-[var(--muted)]">Videos Analyzed</div>
                    </div>
                    <div className="card !rounded-xl !p-6 text-center group hover:!border-[var(--primary)]">
                        <div className="text-3xl font-bold gradient-text mb-1">0</div>
                        <div className="text-sm text-[var(--muted)]">Clips Generated</div>
                    </div>
                    <div className="card !rounded-xl !p-6 text-center group hover:!border-[var(--primary)]">
                        <div className="text-3xl font-bold gradient-text mb-1">—</div>
                        <div className="text-sm text-[var(--muted)]">Viral Score</div>
                    </div>
                </div>
            </main>
        </div>
    );
}
