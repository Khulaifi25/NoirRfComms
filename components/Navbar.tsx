"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import DarkLightMode from "@/components/darklgmode";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const router = useRouter();

    const isAdmin =
    pathname.startsWith("/admin") && pathname !== "/admin";    

    // Hindari hydration mismatch
    const currentTheme = mounted ? theme : "light";

    const menuClass = `
        px-4 py-2 rounded-full transition-all duration-300
        ${
        currentTheme === "dark"
            ? scrolled
            ? "text-black hover:bg-black/10"
            : "text-white hover:bg-white/10"
            : scrolled
            ? "text-white hover:bg-white/10"
            : "text-black hover:bg-black/10"
        }
    `;

    const navbarClass = scrolled
        ? currentTheme === "dark"
        ? "max-w-5xl mx-auto px-6 py-3 rounded-2xl bg-white/40 backdrop-blur-xl border border-black/10 shadow-lg"
        : "max-w-5xl mx-auto px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg"
        : "max-w-7xl mx-auto px-8 py-6 bg-transparent";

    const logoSrc =
        currentTheme === "dark"
        ? scrolled
            ? "/logo.png"
            : "/logo2.png"
        : scrolled
            ? "/logo2.png"
            : "/logo.png";

    const publicMenus = [
        { name: "Home", href: "/" },
        { name: "Gallery", href: "/portfolio" },
        { name: "Queue", href: "/queue" },
        { name: "Commission", href: "/commission" },
        { name: "Order", href: "/order" },
        { name: "Reviews", href: "/reviews" },
        { name: "Admin", href: "/admin" },
        ];
    const adminMenus = [
        {
        name: "Dashboard",
        href: "/admin/dashboard",
        },
        {
        name: "Portfolio",
        href: "/admin/portfolio",
        },
        {
        name: "Commission",
        href: "/admin/commission",
        },
        {
        name: "Orders",
        href: "/admin/orders",
        },
        {
        name: "Reviews",
        href: "/admin/reviews",
        },
        ];
        
        const menus = isAdmin
        ? adminMenus
        : publicMenus;

        async function handleLogout() {
            await supabase.auth.signOut();
        
            router.push("/admin");
        }

            
    return (
        <>
        {/* Spacer */}
        <div className="h-24" />

        <nav
            className={`
            fixed top-0 left-0 right-0 z-50
            transition-all duration-500 ease-in-out
            ${scrolled ? "pt-4" : ""}
            `}
        >
            <div
            className={`
                flex items-center justify-between
                transition-all duration-500 ease-in-out
                ${navbarClass}
            `}
            >
            {/* Logo */}
            <Link href="/">
                <Image
                src={logoSrc}
                alt="Logo"
                width={112}
                height={28}
                priority
                className={`
                    h-auto transition-all duration-500
                    ${scrolled ? "w-24" : "w-28"}
                `}
                />
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-2">
            {menus.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={menuClass}
                >
                {item.name}
                </Link>
            ))}

            {isAdmin && (
                <button
                onClick={handleLogout}
                className={menuClass}
                >
                Logout
                </button>
            )}
            </div>
            <DarkLightMode scrolled={scrolled} />
            </div>
            
        </nav>
        </>
    );
}