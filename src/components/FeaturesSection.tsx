"use client";

import { features } from "@/constants/constants";

const FeaturesSection = () => {
  return (
    <section className="section-padding" id="features">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase gradient-text mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Go Viral</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Six powerful AI-driven tools working together to help you create, optimize, and scale content that wins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`card group cursor-default reveal reveal-delay-${(i % 3) + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 group-hover:text-[var(--primary)] transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
