"use client";
import LoginContent from "@/views/LoginContent";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LoginPage() {
    return (
        <ThemeProvider>
            <LoginContent />
        </ThemeProvider>
    );
}
