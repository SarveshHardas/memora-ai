"use client";

import Dashboard from "@/pages/Dashboard";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function DashboardPage() {
    return (
        <ThemeProvider>
            <Dashboard />
        </ThemeProvider>
    );
}
