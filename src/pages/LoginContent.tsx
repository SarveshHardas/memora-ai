import { signIn } from "next-auth/react";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

export default function LoginContent() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
            style={{ background: "var(--gradient-hero)" }}
        >
            <div
                className="absolute top-16 left-8 w-[420px] h-[420px] rounded-full opacity-30 animate-pulseGlow pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(79,70,229,0.25), transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-16 right-8 w-[350px] h-[350px] rounded-full opacity-20 animate-pulseGlow pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)",
                    animationDelay: "1.5s",
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 animate-spin-slow pointer-events-none"
                style={{ background: "var(--gradient-primary)" }}
            />

            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-200 cursor-pointer z-20 shadow-sm"
                aria-label="Toggle theme"
            >
                {theme === "light" ? (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                ) : (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
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

            <div className="relative z-10 w-full max-w-md animate-fadeInUp">
                <div className="card !rounded-2xl !p-10 text-center relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ background: "var(--gradient-primary)" }}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ background: "var(--gradient-primary)" }}
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">
                                Memora <span className="gradient-text">AI</span>
                            </span>
                        </div>

                        <p className="text-sm text-[var(--muted)] mb-10">
                            Sign in to start turning your content into viral growth
                        </p>

                        <button
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--primary)] hover:shadow-lg text-[var(--foreground)]"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--border-color)]" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-4 text-xs text-[var(--muted)] bg-[var(--surface)]">
                                    Secure authentication powered by Google
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-6 text-[var(--muted)]">
                            <div className="flex items-center gap-1.5 text-xs">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Encrypted
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Privacy First
                            </div>
                            <div className="flex items-center gap-1.5 text-xs">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                No Spam
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-xs text-[var(--muted)] mt-6">
                    By continuing, you agree to our{" "}
                    <a
                        href="#"
                        className="underline hover:text-[var(--foreground)] transition-colors"
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="underline hover:text-[var(--foreground)] transition-colors"
                    >
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}