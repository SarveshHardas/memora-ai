"use client";

import { plans } from "@/constants/constants";

const PricingSection = () => {
  return (
    <section className="section-padding" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase gradient-text mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Start free. Upgrade when you&apos;re ready to go viral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`card relative reveal reveal-delay-${i + 1} ${
                plan.highlighted
                  ? "!border-[var(--primary)] ring-1 ring-[var(--primary)] scale-[1.02]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-semibold"
                  style={{ background: "var(--gradient-primary)" }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-[var(--muted)] text-sm">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)]">{plan.description}</p>
              </div>

              <a
                href="#"
                className={`block text-center w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 mb-6 ${
                  plan.highlighted
                    ? "btn-primary !block text-center"
                    : "bg-[var(--surface-hover)] text-[var(--foreground)] hover:bg-[var(--border-color)]"
                }`}
              >
                {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
              </a>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                    <span className={feature.included ? "" : "text-[var(--muted)] opacity-60"}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
