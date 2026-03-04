"use client";

const FinalCTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Stop Guessing.
          <br />
          <span className="gradient-text">Start Trending.</span>
        </h2>
        <p className="text-lg text-[var(--muted)] mb-10 max-w-xl mx-auto">
          Join thousands of creators who use Memora AI to turn their content into a growth engine powered by data, not luck.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/login" className="btn-primary text-base !py-4 !px-10">
            Launch Memora AI
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a href="#pricing" className="btn-secondary text-base !py-4 !px-10">
            Talk to Sales
          </a>
        </div>
        <p className="text-sm text-[var(--muted)] mt-6">
          No credit card required • Free plan available • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
