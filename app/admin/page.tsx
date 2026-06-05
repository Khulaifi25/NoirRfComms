"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setLoading(true);

        const { error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
        alert(error.message);
        return;
        }

        router.push("/admin/dashboard");
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/20 backdrop-blur-xl p-8">

            <h1 className="text-3xl font-bold mb-6">
            Admin Login
            </h1>

            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            className="w-full rounded-xl border p-3 mb-4"
            />

            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            className="w-full rounded-xl border p-3 mb-4"
            />

            <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold"
            >
            {loading
                ? "Loading..."
                : "Login"}
            </button>
        </div>
        </main>
    );
}