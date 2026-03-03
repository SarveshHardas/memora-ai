"use client";

import { platforms } from "@/constants/constants";

const SocialProofStrip = () => {
  return (
    <section className="section-padding !py-12 border-y border-[var(--border-color)]">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm font-medium text-[var(--muted)] mb-8 tracking-wide uppercase">
          Trusted by 10,000+ creators on leading platforms
        </p>
        <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap text-[var(--muted)]">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-100 opacity-60"
              title={p.name}
            >
              {p.svg}
              <span className="text-sm font-medium hidden sm:inline">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofStrip;
