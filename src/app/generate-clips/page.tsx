"use client";

import ClipsView from "@/views/ClipsView";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function GenerateClipsPage() {
    return (
        <ThemeProvider>
            <ClipsView />
        </ThemeProvider>
    );
}
