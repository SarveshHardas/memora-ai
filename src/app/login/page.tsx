"use client";
import LoginContent from "@/pages/LoginContent";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LoginPage() {
    return (
        <ThemeProvider>
            <LoginContent />
        </ThemeProvider>
    );
}
