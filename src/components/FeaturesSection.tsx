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
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Six powerful AI-driven tools working together to help you create,
            optimize, and scale content that wins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[260px]">
          {features.map((feature, i) => {
            const isLarge = i === 0;

            return (
              <div
                key={i}
                className={`glass card min-h-60 flex flex-col gap-5 p-8 ${
                  isLarge ? "justify-between" : "justify-start"
                } ${feature.span}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>

                <p className="text-muted text-sm leading-relaxed max-w-[55ch]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
