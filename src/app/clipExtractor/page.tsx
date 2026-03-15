"use client";

import ViralClipExtractorView from "@/views/ViralClipExtractorView";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ViralClipExtractorPage() {
    return (
        <ThemeProvider>
            <ViralClipExtractorView />
        </ThemeProvider>
    );
}
