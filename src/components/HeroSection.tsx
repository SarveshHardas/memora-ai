"use client";

import Image from "next/image";
import { quickStats } from "@/constants/constants";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full opacity-30 animate-pulseGlow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,70,229,0.2), transparent 70%)" }} />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full opacity-20 animate-pulseGlow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)", animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <div className="flex flex-col gap-6 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border-color)] w-fit text-sm font-medium text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Powered by Agentic AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight">
            Turn Every Video
            <br />
            Into{" "}
            <span className="gradient-text">Viral Gold.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-lg leading-relaxed">
            Memora AI analyzes trends, extracts high-viral-potential clips, and
            tells you exactly what content wins today.
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <a href="/login" className="btn-primary text-base !py-3.5 !px-8">
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <button className="btn-secondary text-base !py-3.5 !px-8">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-[var(--border-color)]">
            {quickStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-[var(--muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--gradient-primary)" }} />
            <Image
              src="/hero-robot.png"
              alt="Memora AI Agent - Futuristic Robot"
              width={600}
              height={600}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </div>

          <div className="absolute top-8 right-0 glass rounded-xl px-4 py-3 animate-floatSlow hidden lg:block"
            style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              <span>Viral Score: <span className="gradient-text font-bold">94</span></span>
            </div>
          </div>

          <div className="absolute bottom-16 left-0 glass rounded-xl px-4 py-3 animate-floatSlow hidden lg:block"
            style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
              <span>Engagement <span className="text-green-400 font-bold">+47%</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
