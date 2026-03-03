"use client";

import { painPoints } from "@/constants/constants";

const ProblemSection = () => {
  return (
    <section className="section-padding" id="problem">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Creating Viral Content Is Not Luck.{" "}
            <span className="gradient-text">It&apos;s Data.</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Most creators are stuck in a cycle of guessing, wasting time, and hoping for the algorithm to notice. There&apos;s a better way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className={`card reveal reveal-delay-${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "var(--gradient-hero)" }}>
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{point.title}</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
