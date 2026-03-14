"use client";

const FinalCTASection = () => {
  return (
    <section
      id="user-archieve"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-105 rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Understand Your
          <br />
          <span className="gradient-text">Digital Behavior.</span>
        </h2>

        <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
          This browser extension tracks your browsing activity only when
          enabled, analyzes visited pages, detects patterns in your online
          behavior, and generates concise summaries of how you spend time on the
          web.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/login" className="btn-primary text-base py-4! px-10!">
            Install Extension
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="3" x2="12" y2="15" />
              <polyline points="7 10 12 15 17 10" />
              <path d="M5 21h14" />
            </svg>
          </a>

          <a href="#features" className="btn-secondary text-base py-4! px-10!">
            Explore Features
          </a>
        </div>

        <p className="text-sm text-muted mt-6">
          Works with modern browsers • Activity tracking can be toggled anytime
          • Designed with privacy-first principles
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
