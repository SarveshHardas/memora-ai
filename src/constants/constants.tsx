export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Analytics", href: "#analytics" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export const quickStats = [
  { value: "10K+", label: "Creators" },
  { value: "2M+", label: "Clips Generated" },
  { value: "98%", label: "Satisfaction" },
];

export const platforms = [
  {
    name: "YouTube",
    svg: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        opacity="0.5"
      >
        <path d="M23.499 6.203a3.008 3.008 0 0 0-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 0 0-2.088 2.09A31.258 31.258 0 0 0 0 12.01a31.258 31.258 0 0 0 .523 5.785 3.008 3.008 0 0 0 2.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 0 0 2.089-2.09 31.258 31.258 0 0 0 .524-5.784 31.258 31.258 0 0 0-.524-5.807zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    svg: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    svg: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        opacity="0.5"
      >
        <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004c-.097-.573-.064-.943-.058-.943h-3.12v14.843c0 .201 0 .399-.008.595 0 .024-.003.046-.004.073 0 .013 0 .025-.002.038a3.22 3.22 0 0 1-1.593 2.511 3.162 3.162 0 0 1-1.678.476 3.226 3.226 0 0 1-3.222-3.224 3.226 3.226 0 0 1 3.222-3.225c.34 0 .667.057.974.162v-3.17a6.364 6.364 0 0 0-.974-.074 6.36 6.36 0 0 0-4.508 1.867A6.327 6.327 0 0 0 3.625 15.5a6.34 6.34 0 0 0 1.867 4.508 6.36 6.36 0 0 0 4.508 1.867 6.36 6.36 0 0 0 4.508-1.867 6.356 6.356 0 0 0 1.867-4.508V9.17a9.28 9.28 0 0 0 5.45 1.754V7.81a5.965 5.965 0 0 1-2.504-2.248z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    svg: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        opacity="0.5"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const painPoints = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Finding Trends Is Exhausting",
    description:
      "Spending hours scrolling through platforms trying to decode what's trending right now — while trends expire by the hour.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    title: "Editing Takes Forever",
    description:
      "Manually clipping, resizing, captioning, and reformatting for every platform burns hours that could go to creating.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Guessing What Works",
    description:
      "Posting and praying isn't a strategy. Without data-driven insights, content growth is unpredictable and frustrating.",
  },
];

export const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "AI Viral Clip Generator",
    description:
      "Automatically extracts high-engagement moments from long videos and formats them for maximum impact.",
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Trend Intelligence Engine",
    description:
      "Recommends content ideas based on real-time viral patterns across platforms.",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20 12a8 8 0 0 0-8-8v8h8z" />
      </svg>
    ),
    title: "Agentic Decision System",
    description:
      "Acts autonomously to optimize your content strategy — no manual intervention needed.",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "Performance Analytics",
    description:
      "Advanced dashboards showing engagement, retention, and growth metrics in real time.",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Smart Hook Detection",
    description:
      "Detects powerful openings that increase watch time and keep viewers hooked from the first second.",
    span: "lg:col-span-1 lg:row-span-2",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="brown"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Multi-Platform Optimization",
    description:
      "Formats clips automatically for Reels, Shorts, TikTok, and more — all in one click.",
    span: "lg:col-span-2 lg:row-span-1",
  },
];

export const steps = [
  {
    number: "01",
    title: "Upload Your Video",
    description:
      "Drop any long-form video — podcast, vlog, stream, or tutorial. Memora AI handles the rest.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Detects Viral Moments",
    description:
      "Our agentic AI analyzes hooks, engagement patterns, and trend data to find the clips most likely to go viral.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Publish & Track Analytics",
    description:
      "Export optimized clips for every platform and monitor performance with real-time analytics dashboards.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export const stats = [
  { label: "Total Views", value: "2.4M", change: "+23%", up: true },
  { label: "Viral Clips", value: "847", change: "+12%", up: true },
  { label: "Avg Watch Time", value: "47s", change: "+8%", up: true },
  { label: "Viral Score", value: "94/100", change: "+5", up: true },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    role: "YouTube Creator • 1.2M subs",
    avatar: "SC",
    color: "#4f46e5",
    quote:
      "Memora AI literally changed the game for my Shorts strategy. I went from 50K to 500K views per Short in under two months. The viral detection is scary accurate.",
  },
  {
    name: "Marcus Rivera",
    handle: "@marcusriv",
    role: "TikTok Creator • 800K followers",
    avatar: "MR",
    color: "#7c3aed",
    quote:
      "I used to spend 4 hours editing clips. Now Memora pulls the best moments automatically. My engagement rate jumped 3x and I actually have time to create more content.",
  },
  {
    name: "Priya Sharma",
    handle: "@priyatalks",
    role: "Podcaster • 300K listeners",
    avatar: "PS",
    color: "#06b6d4",
    quote:
      "The trend intelligence feature is what sets Memora apart. It tells me exactly what topics are surging — so I'm always creating content that people are actively searching for.",
  },
];

export const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description:
      "Perfect for getting started with AI-powered content creation.",
    highlighted: false,
    features: [
      { text: "5 video uploads / month", included: true },
      { text: "Basic viral clip detection", included: true },
      { text: "2 platform exports", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "Trend intelligence", included: false },
      { text: "Smart hook detection", included: false },
      { text: "Priority processing", included: false },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious creators ready to scale their content machine.",
    highlighted: true,
    badge: "Most Popular",
    features: [
      { text: "Unlimited video uploads", included: true },
      { text: "Advanced viral detection", included: true },
      { text: "All platform exports", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "Trend intelligence engine", included: true },
      { text: "Smart hook detection", included: true },
      { text: "Priority processing", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For teams and agencies managing multiple creator accounts.",
    highlighted: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Multi-account management", included: true },
      { text: "Custom AI training", included: true },
      { text: "White-label exports", included: true },
      { text: "Advanced API access", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom integrations", included: true },
      { text: "SLA guarantee", included: true },
    ],
  },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Analytics", href: "#analytics" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];
