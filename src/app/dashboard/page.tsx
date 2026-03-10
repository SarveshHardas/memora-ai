"use client";

import Dashboard from "@/views/Dashboard";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function DashboardPage() {
    return (
        <ThemeProvider>
            <Dashboard />
        </ThemeProvider>
    );
}
