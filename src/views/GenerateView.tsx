"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useRef, Suspense } from "react";
import { useTheme } from "@/components/ThemeProvider";

type Tab = "thumbnail" | "caption";

function GenerateViewInner() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get("tab") as Tab) || "thumbnail";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [prompt, setPrompt] = useState("");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      router.replace(`/generate?tab=${tab}`, { scroll: false });
    },
    [router],
  );

  const handleImageUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/"),
      );
      const combined = [...uploadedImages, ...newFiles].slice(0, 4);
      setUploadedImages(combined);

      const previews = combined.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => {
        prev.forEach((url) => URL.revokeObjectURL(url));
        return previews;
      });
    },
    [uploadedImages],
  );

  const removeImage = useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleImageUpload(e.dataTransfer.files);
    },
    [handleImageUpload],
  );

  // const handleGenerate = useCallback(async () => {
  //     setIsGenerating(true);
  //     // Placeholder for actual API call
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     setIsGenerating(false);
  // }, []);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // api/generateCaption.ts

  const generateCaption = async (prompt: string) => {
    try {
      const res = await fetch("/api/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Caption generation failed");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error calling generate-caption API:", error);
      throw error;
    }
  };

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);

    const form = new FormData();
    form.append("prompt", prompt);

    const res = await fetch("/api/generate-thumbnail", {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();

    const imageURL = URL.createObjectURL(blob);

    setGeneratedImage(imageURL);

    setIsGenerating(false);
  }, [prompt]);

  const handleGenerateCaption = async () => {
    try {
      const data = await generateCaption("Write a viral caption for this clip");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (status === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="animate-fadeInUp flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 animate-pulseGlow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 animate-pulseGlow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
          animationDelay: "1.5s",
        }}
      />

      {/* Top navigation bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Memora <span className="gradient-text">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="w-10 h-10 rounded-xl object-cover border border-[var(--border-color)]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-medium bg-[var(--surface)] border border-[var(--border-color)] hover:border-red-400 hover:text-red-500 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 pb-16">
        {/* Header */}
        <div className="animate-fadeInUp text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            AI <span className="gradient-text">Content Studio</span>
          </h1>
          <p className="text-[var(--muted)] text-sm md:text-base">
            Generate stunning thumbnails and viral captions with AI
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="animate-fadeInUp flex gap-2 p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] shadow-sm mb-8 max-w-md mx-auto"
          style={{ animationDelay: "0.1s" }}
        >
          <button
            onClick={() => handleTabChange("thumbnail")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "thumbnail"
                ? "text-white shadow-lg"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            }`}
            style={
              activeTab === "thumbnail"
                ? { background: "var(--gradient-primary)" }
                : {}
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Thumbnail</span>
          </button>
          <button
            onClick={() => handleTabChange("caption")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "caption"
                ? "text-white shadow-lg"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
            }`}
            style={
              activeTab === "caption"
                ? { background: "var(--gradient-primary)" }
                : {}
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Caption</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          {activeTab === "thumbnail" ? (
            <div className="space-y-6">
              {/* Prompt input */}
              <div className="card !rounded-2xl !p-6 hover:!transform-none">
                <label className="block text-sm font-semibold mb-3 text-[var(--foreground)]">
                  <span className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Describe your thumbnail
                  </span>
                </label>
                <textarea
                  id="thumbnail-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A vibrant YouTube thumbnail with bold text 'TOP 10 AI TOOLS' on a futuristic gradient background..."
                  rows={4}
                  className="w-full bg-[var(--surface-hover)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Image upload */}
              <div className="card !rounded-2xl !p-6 hover:!transform-none">
                <label className="block text-sm font-semibold mb-3 text-[var(--foreground)]">
                  <span className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Reference Images
                    <span className="text-xs font-normal text-[var(--muted)]">
                      (optional, max 4)
                    </span>
                  </span>
                </label>

                {/* Drop zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragOver
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border-color)] hover:border-[var(--primary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: isDragOver
                          ? "var(--gradient-primary)"
                          : "var(--surface-hover)",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isDragOver ? "white" : "var(--muted)"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        Drop images here or{" "}
                        <span className="text-[var(--primary)]">browse</span>
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-1">
                        PNG, JPG, WebP up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group rounded-xl overflow-hidden aspect-square border border-[var(--border-color)]"
                      >
                        <img
                          src={preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-lg"
                        >
                          ✕
                        </button>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Generate button */}
              <button
                id="generate-thumbnail-btn"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full btn-primary !py-4 !rounded-2xl !text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Thumbnail...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Generate Thumbnail
                  </>
                )}
              </button>
              {generatedImage && (
                <div className="mt-6">
                  <img
                    src={generatedImage}
                    className="w-full rounded-xl border border-[var(--border-color)]"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Caption prompt input */}
              <div className="card !rounded-2xl !p-6 hover:!transform-none">
                <label className="block text-sm font-semibold mb-3 text-[var(--foreground)]">
                  <span className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Describe your content
                  </span>
                </label>
                <textarea
                  id="caption-prompt"
                  value={captionPrompt}
                  onChange={(e) => setCaptionPrompt(e.target.value)}
                  placeholder="e.g. Write a viral Instagram caption for a fitness transformation post with motivational tone, include relevant hashtags..."
                  rows={5}
                  className="w-full bg-[var(--surface-hover)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-200 resize-none"
                />
              </div>

              {/* Quick options */}
              <div className="card !rounded-2xl !p-6 hover:!transform-none">
                <label className="block text-sm font-semibold mb-3 text-[var(--foreground)]">
                  <span className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                    Platform & Tone
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "YouTube",
                    "Instagram",
                    "TikTok",
                    "Twitter/X",
                    "LinkedIn",
                  ].map((platform) => (
                    <button
                      key={platform}
                      className="px-4 py-2 rounded-xl text-xs font-medium border border-[var(--border-color)] bg-[var(--surface-hover)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "Professional",
                    "Casual",
                    "Funny",
                    "Motivational",
                    "Educational",
                  ].map((tone) => (
                    <button
                      key={tone}
                      className="px-4 py-2 rounded-xl text-xs font-medium border border-[var(--border-color)] bg-[var(--surface-hover)] text-[var(--foreground)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-200 cursor-pointer"
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                id="generate-caption-btn"
                onClick={handleGenerateCaption}
                disabled={!captionPrompt.trim() || isGenerating}
                className="w-full btn-primary !py-4 !rounded-2xl !text-base justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:!transform-none"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Caption...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Generate Caption
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Back to Dashboard link */}
        <div className="text-center mt-10">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200 cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}

export default function GenerateView() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <GenerateViewInner />
    </Suspense>
  );
}
