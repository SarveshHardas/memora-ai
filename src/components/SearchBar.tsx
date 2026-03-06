"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    isSearching: boolean;
}

export default function SearchBar({ onSearch, isSearching }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isSearching) {
            onSearch(query.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const suggestions = [
        "Find the video where I talked about NextAuth",
        "Show me clips about React hooks",
        "Videos about MongoDB setup",
        "Content about API design patterns",
    ];

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="relative">
                <div
                    className="relative rounded-2xl transition-all duration-300"
                    style={{
                        boxShadow: isFocused
                            ? "0 0 0 2px var(--primary), 0 8px 40px rgba(79,70,229,0.15)"
                            : "var(--shadow-card)",
                    }}
                >
                    <div
                        className="flex items-center gap-3 bg-[var(--surface)] rounded-2xl border transition-colors duration-200 px-5 py-4"
                        style={{
                            borderColor: isFocused
                                ? "var(--primary)"
                                : "var(--border-color)",
                        }}
                    >
                        {/* AI Sparkle icon */}
                        <div className="flex-shrink-0">
                            {isSearching ? (
                                <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-[var(--primary)]"
                                >
                                    <path
                                        d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
                                        fill="currentColor"
                                        opacity="0.9"
                                    />
                                </svg>
                            )}
                        </div>

                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Memora... e.g. find the video about NextAuth"
                            className="flex-1 bg-transparent outline-none text-base text-[var(--foreground)] placeholder:text-[var(--muted)]"
                            disabled={isSearching}
                            id="search-input"
                        />

                        <button
                            type="submit"
                            disabled={!query.trim() || isSearching}
                            className="flex-shrink-0 h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                            style={{
                                background: "var(--gradient-primary)",
                            }}
                        >
                            {isSearching ? "Searching..." : "Search"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Suggestion chips */}
            {!query && (
                <div className="flex flex-wrap gap-2 mt-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
                    <span className="text-xs text-[var(--muted)] mr-1 self-center">Try:</span>
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setQuery(s);
                                onSearch(s);
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--border-color)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--foreground)] transition-all duration-200 cursor-pointer"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
