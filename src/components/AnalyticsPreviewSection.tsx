"use client";

import { stats } from "@/constants/constants";

const AnalyticsPreviewSection = () => {
  return (
    <section className="section-padding" id="analytics">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold tracking-wider uppercase gradient-text mb-4">
            Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Data-Driven{" "}
            <span className="gradient-text">Growth Intelligence</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Track every metric that matters. Understand what works, why it works, and how to replicate success.
          </p>
        </div>

        <div className="card !p-0 overflow-hidden reveal">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-sm text-[var(--muted)] font-medium">Memora AI Dashboard</div>
            <div className="text-xs text-[var(--muted)]">Live</div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-[var(--border-color)]">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[var(--surface-hover)] rounded-xl p-4">
                <div className="text-sm text-[var(--muted)] mb-1">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-sm font-medium ${stat.up ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[var(--surface-hover)] rounded-xl p-5">
              <div className="text-sm font-medium mb-4">Engagement Over Time</div>
              <div className="relative h-48">
                <svg viewBox="0 0 500 180" className="w-full h-full" preserveAspectRatio="none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={i} x1="0" y1={i * 45} x2="500" y2={i * 45} stroke="var(--border-color)" strokeWidth="1" />
                  ))}
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,140 C40,130 80,120 120,100 C160,80 200,90 240,60 C280,30 320,40 360,25 C400,10 440,30 500,15 L500,180 L0,180 Z"
                    fill="url(#areaGrad)"
                  />
                  <path
                    d="M0,140 C40,130 80,120 120,100 C160,80 200,90 240,60 C280,30 320,40 360,25 C400,10 440,30 500,15"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {[
                    [0, 140], [120, 100], [240, 60], [360, 25], [500, 15],
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="4" fill="var(--primary)" stroke="var(--surface)" strokeWidth="2" />
                  ))}
                </svg>
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-[var(--muted)] -translate-x-6">
                  <span>100K</span><span>75K</span><span>50K</span><span>25K</span><span>0</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[var(--muted)] mt-2 px-1">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[var(--surface-hover)] rounded-xl p-5">
                <div className="text-sm font-medium mb-4">Engagement Heatmap</div>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const intensity = [0.15, 0.3, 0.5, 0.7, 0.9][Math.floor(Math.random() * 5)];
                    return (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{ background: `var(--primary)`, opacity: intensity }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-[var(--muted)] mt-2">
                  <span>Less</span><span>More</span>
                </div>
              </div>

              <div className="bg-[var(--surface-hover)] rounded-xl p-5">
                <div className="text-sm font-medium mb-4">Retention Curve</div>
                <div className="h-20">
                  <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,5 C30,5 50,15 80,25 C110,35 130,50 160,60 C180,68 200,72 200,75 L200,80 L0,80 Z" fill="url(#retGrad)" />
                    <path d="M0,5 C30,5 50,15 80,25 C110,35 130,50 160,60 C180,68 200,72 200,75" fill="none" stroke="var(--secondary)" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-[var(--muted)] mt-1">
                  <span>0s</span><span>15s</span><span>30s</span><span>60s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreviewSection;
