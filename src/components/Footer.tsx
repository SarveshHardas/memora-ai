"use client";

import { platforms } from "@/constants/constants";
import { footerLinks } from "@/constants/constants";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gradient-primary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="font-bold text-lg">Memora <span className="gradient-text">AI</span></span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
              The intelligent AI agent that turns your video content into viral growth.
            </p>
            <div className="flex items-center gap-3">
              {platforms.map((platform, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--surface-hover)] text-[var(--muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-all duration-200"
                  title={platform.name}
                >
                  {platform.svg}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Memora AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Terms</a>
            <a href="#" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
