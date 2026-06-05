export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabase } from "@/lib/supabase";
import CommissionInfo from "@/components/CommissionInfo";
import Link from "next/link";

export default async function CommissionPage() {
    const { data: commissions } = await supabase
        .from("commission_types")
        .select("*")
        .eq("is_active", true);

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">
            COMMISSION
        </h1>

        <p className="mb-10 text-lg">
            Original character, personal use, commercial use,
            Vtuber character, Anime character, etc.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {commissions?.map((item) => {
            const slotLeft =
                item.slot_limit - item.slot_used;

            return (
                <div
                key={item.id}
                className="
                    rounded-3xl
                    bg-black/25
                    backdrop-blur-xl
                    border
                    border-white/25
                    p-6
                "
                >
                <h2 className="text-2xl font-bold">
                    {item.name}
                </h2>

                <p className="mt-2 opacity-80">
                    {item.description}
                </p>

                <p className="mt-4 font-semibold">
                    Rp {item.base_price.toLocaleString("id-ID")}
                </p>

                <p className="mt-2">
                    Slot tersisa:
                    <span className={`font-bold ml-2 ${slotLeft > 0 ? "text-green-500" : "text-red-500"}`}>
                    {slotLeft}
                    </span>
                </p>

                {slotLeft > 0 ? (
                <Link
                    href={`/order?commission=${item.id}`}
                    className="
                    mt-6
                    block
                    w-full
                    rounded-full
                    py-3
                    text-center
                    font-semibold
                    bg-emerald-500
                    hover:bg-emerald-600
                    transition-all
                    "
                >
                    Pilih Commission
                </Link>
                ) : (
                <button
                    disabled
                    className="
                    mt-6
                    w-full
                    rounded-full
                    py-3
                    font-semibold
                    bg-gray-400
                    cursor-not-allowed
                    "
                >
                    Slot Full
                </button>
                )}
                </div>
            );
            })}
        </div>
        <CommissionInfo />
        </main>
    );
}