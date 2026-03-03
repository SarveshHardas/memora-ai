"use client";

import { steps } from "@/constants/constants";

const HowItWorksSection = () => {
  return (
    <section className="section-padding relative" id="how-it-works" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase gradient-text mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Three Steps to{" "}
            <span className="gradient-text">Viral Content</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            From upload to publish — Memora AI automates the entire content optimization pipeline.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[72px] left-[16.67%] right-[16.67%] h-[2px]">
            <div className="w-full h-full" style={{ background: "var(--gradient-primary)", opacity: 0.3 }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col items-center text-center reveal reveal-delay-${i + 1}`}>
                <div className="relative mb-6">
                  <div
                    className="w-[88px] h-[88px] rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--surface)] border-2 border-[var(--primary)] flex items-center justify-center text-xs font-bold text-[var(--primary)]">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
