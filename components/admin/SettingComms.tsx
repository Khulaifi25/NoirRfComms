"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Settings = {
    id: number;
    commission_status: boolean;
    commission_message: string | null;
};

export default function SettingComms({
    settings,
}: {
    settings: Settings;
}) {
    const router = useRouter();

    const [status, setStatus] = useState(
        settings.commission_status
    );

    const [message, setMessage] = useState(
        settings.commission_message ?? ""
    );

    const [loading, setLoading] =
        useState(false);

    async function saveSettings() {
        try {
            setLoading(true);

            const { error } =
                await supabase
                    .from("settings")
                    .update({
                        commission_status:
                            status,
                        commission_message:
                            message,
                        updated_at:
                            new Date()
                                .toISOString(),
                    })
                    .eq("id", settings.id);

            if (error) {
                throw error;
            }

            alert(
                "Settings berhasil disimpan."
            );

            router.refresh();

        } catch (err) {
            console.error(err);

            alert(
                "Gagal menyimpan settings."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="
                rounded-3xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                p-6
            "
        >
            <h2
                className="
                    text-2xl
                    font-bold
                    mb-6
                "
            >
                Commission Settings
            </h2>

            <div className="space-y-6">
            <div>
                <label
                    className="
                        block
                        mb-3
                        font-medium
                    "
                >
                    Commission Status
                </label>

                <button
                    type="button"
                    onClick={() =>
                        setStatus(!status)
                    }
                    className={`
                        relative
                        inline-flex
                        h-8
                        w-16
                        items-center
                        rounded-full
                        transition-all
                        ${
                            status
                                ? "bg-emerald-500"
                                : "bg-red-500"
                        }
                    `}
                >
                    <span
                        className={`
                            inline-block
                            h-6
                            w-6
                            transform
                            rounded-full
                            bg-white
                            transition
                            ${
                                status
                                    ? "translate-x-9"
                                    : "translate-x-1"
                            }
                        `}
                    />
                </button>

                <span
                    className={`
                        ml-4
                        font-extrabold
                        ${
                            status
                                ? "text-emerald-400"
                                : "text-red-400"
                        }
                    `}
                >
                    {status ? "OPEN" : "CLOSED"}
                </span>
            </div>

                <div>

                    <label
                        className="
                            block
                            mb-2
                            font-medium
                        "
                    >
                        Closed Message
                    </label>

                    <textarea
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        rows={1}
                        className="
                            w-full
                            min-h-[90px]
                            rounded-xl
                            bg-black/20
                            border
                            border-white/10
                            p-4
                            resize-none
                        "
                        placeholder="
                            Commission is currently closed.
                        "
                    />

                </div>

                <button
                    onClick={saveSettings}
                    disabled={loading}
                    className="
                        px-5
                        py-3
                        rounded-xl
                        bg-emerald-500
                        text-black
                        font-semibold
                        hover:bg-emerald-400
                        disabled:opacity-50
                    "
                >
                    {loading
                        ? "Saving..."
                        : "Save Settings"}
                </button>

            </div>
        </div>
    );
}