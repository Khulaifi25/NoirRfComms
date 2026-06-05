"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkLightMode({
    scrolled = false,
    }: {
    scrolled?: boolean;
    }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const iconClass =
    theme === "dark"
        ? scrolled
        ? "text-black hover:bg-black/10"
        : "text-white hover:bg-white/10"
        : scrolled
        ? "text-white hover:bg-white/10"
        : "text-black hover:bg-black/10";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
        onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
        }
        className={`p-2 rounded-full transition-all duration-300 ${iconClass}`}
        >
        {theme === "dark" ? (
            <Sun size={20} />
        ) : (
            <Moon size={20} />
        )}
        </button>
    );
}