import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Memora AI – Turn Every Video Into Viral Gold",
  description:
    "Memora AI analyzes trends, extracts high-viral-potential clips from your long-form videos, and tells you exactly what content wins today. Built for influencers and content creators.",
  keywords: [
    "AI video editor",
    "viral clips",
    "content creator tools",
    "trend intelligence",
    "short-form video",
    "Reels",
    "Shorts",
    "TikTok",
  ],
  openGraph: {
    title: "Memora AI – Turn Every Video Into Viral Gold",
    description:
      "AI-powered viral clip extraction and trend intelligence for content creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('memora-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
