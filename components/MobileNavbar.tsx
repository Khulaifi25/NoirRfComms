"use client";

import Link from "next/link";
import {
    IconHome,
    IconPhoto,
    IconPalette,
    IconFileInvoice,
    IconStar,
    IconClockQuestion,
    IconLock,
    IconLogout,
    IconLayoutDashboard,
    IconPackage,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function MobileNavbar() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true);
    }, []);

    const currentTheme = mounted ? theme : "light";
    const pathname = usePathname();
    const itemClass =
        currentTheme === "dark"
        ? "text-black"
        : "text-white";
        
    const router = useRouter();

    const isAdmin =
        pathname.startsWith("/admin");

    const publicMenu = [
    {
        name: "Home",
        href: "/",
        icon: IconHome,
    },
    {
        name: "Portfolio",
        href: "/portfolio",
        icon: IconPhoto,
    },
    {
        name: "Queue",
        href: "/queue",
        icon: IconClockQuestion,
    },
    {
        name: "Commission",
        href: "/commission",
        icon: IconPalette,
    },
    {
        name: "Order",
        href: "/order",
        icon: IconFileInvoice,
    },
    {
        name: "Reviews",
        href: "/reviews",
        icon: IconStar,
    },
    {
        name: "Admin",
        href: "/admin",
        icon: IconLock,
    },
    ];

    const adminMenu = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: IconLayoutDashboard,
    },
    {
        name: "Portfolio",
        href: "/admin/portfolio",
        icon: IconPhoto,
    },
    {
        name: "Commission",
        href: "/admin/commission",
        icon: IconPalette,
    },
    {
        name: "Orders",
        href: "/admin/orders",
        icon: IconPackage,
    },
    {
        name: "Reviews",
        href: "/admin/reviews",
        icon: IconStar,
    },
    ];

    const menu =
    isAdmin
        ? adminMenu
        : publicMenu;

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/admin");
    }

    return (
        <nav
        className={`
            md:hidden
            fixed
            bottom-3
            left-3
            right-3
            z-50
            rounded-2xl
            backdrop-blur-xl
            shadow-lg
            transition-all
            duration-300
            ${
            currentTheme === "dark"
                ? "bg-white/20 border border-black/10"
                : "bg-black/30 border border-white/10"
            }
        `}
        >
        <div
            className={`
                grid
                ${isAdmin ? "grid-cols-6" : "grid-cols-7"}
                py-2
            `}
            >
            {menu.map((item) => {
                const Icon = item.icon;

                return (
                <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center transition-all duration-300"
                >
                    <div
                    className={`
                        flex items-center justify-center
                        w-11 h-11 rounded-full
                        transition-all duration-300
                        ${
                        pathname === item.href
                            ? "bg-gray-800 text-white shadow-lg"
                            : itemClass
                        }
                    `}
                    >
                    <Icon size={22} stroke={1.8} />
                    </div>
                </Link>
                );
            })}

            {isAdmin && (
                <button
                onClick={handleLogout}
                className="flex items-center justify-center"
                >
                <div
                    className={`
                    flex items-center justify-center
                    w-11 h-11 rounded-full
                    transition-all duration-300
                    ${itemClass}
                    `}
                >
                    <IconLogout
                    size={22}
                    stroke={1.8}
                    />
                </div>
                </button>
            )}
            </div>
        </nav>
    );
}