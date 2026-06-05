"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StatusBanner() {

    const [time, setTime] = useState("");

    const [commissionOpen, setCommissionOpen] =
        useState(true);

    const [message, setMessage] =
        useState("");

    useEffect(() => {

        async function loadSettings() {

            const { data } =
                await supabase
                    .from("settings")
                    .select("*")
                    .single();

            if (data) {
                setCommissionOpen(
                    data.commission_status
                );

                setMessage(
                    data.commission_message ?? ""
                );
            }
        }

        loadSettings();

    }, []);

    useEffect(() => {

        const updateTime = () => {

            const now = new Date();

            const wibTime =
                now.toLocaleTimeString(
                    "id-ID",
                    {
                        timeZone:
                            "Asia/Jakarta",
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                );

            setTime(wibTime);
        };

        updateTime();

        const interval =
            setInterval(
                updateTime,
                1000
            );

        return () =>
            clearInterval(interval);

    }, []);

    return (
        <div className="flex flex-col items-center mt-12 px-4 gap-3">

            <div
                className="
                    inline-flex
                    items-center
                    gap-4
                    px-4 md:px-5
                    py-2 md:py-2.5
                    rounded-full
                    bg-black/20
                    dark:bg-white/20
                    backdrop-blur-xl
                    border
                    border-white/10
                    shadow-lg
                "
            >

                <div className="flex items-center gap-2">

                    <div
                        className={`
                            w-2.5
                            h-2.5
                            rounded-full
                            animate-pulse
                            ${
                                commissionOpen
                                    ? "bg-green-500"
                                    : "bg-red-500"
                            }
                        `}
                    />

                    <span
                        className="
                            text-sm
                            sm:text-sm
                            md:text-base
                            font-medium
                            tracking-wide
                        "
                    >
                        {commissionOpen
                            ? "COMMISSION OPEN"
                            : "COMMISSION CLOSED"}
                    </span>

                </div>

                <div
                    className="
                        w-px
                        h-4
                        md:h-5
                        bg-white/20
                    "
                />

                <span
                    className="
                        text-xs
                        sm:text-sm
                        md:text-base
                        font-medium
                    "
                >
                    LOCAL TIME : {time} GMT+7
                </span>

            </div>

            {!commissionOpen &&
                message && (
                <div
                    className="
                        relative
                        mt-4
                        max-w-xl
                        mx-auto
                        px-10
                        text-center
                    "
                >

                    <span
                        className="
                            absolute
                            left-0
                            top-[-12px]
                            text-5xl
                            font-serif
                            opacity-30
                            leading-none
                            select-none
                        "
                    >
                        ❝
                    </span>

                    <p
                        className="
                            text-sm
                            md:text-base
                            italic
                            leading-relaxed
                        "
                    >
                        {message}
                    </p>

                    <span
                        className="
                            absolute
                            right-0
                            bottom-[-24px]
                            text-5xl
                            font-serif
                            opacity-30
                            leading-none
                            select-none
                        "
                    >
                        ❞
                    </span>

                </div>
            )}

        </div>
    );
}