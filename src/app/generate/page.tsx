"use client";

import GenerateView from "@/views/GenerateView";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function GeneratePage() {
    return (
        <ThemeProvider>
            <GenerateView />
        </ThemeProvider>
    );
}
