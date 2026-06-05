"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Props {
    orderId: number;
    currentStatus: string;
    commissionTypeId: number;
    }

    export default function OrderStatusForm({
    orderId,
    currentStatus,
    commissionTypeId,
    }: Props) {
    const router = useRouter();

    const [status, setStatus] =
        useState(currentStatus);

    const [loading, setLoading] =
        useState(false);

        async function handleSave() {
            try {
                setLoading(true);
        
                const oldActive =
                    currentStatus === "Accepted" ||
                    currentStatus === "In Progress";
        
                const newActive =
                    status === "Accepted" ||
                    status === "In Progress";
        
                const { data: commission } = await supabase
                    .from("commission_types")
                    .select("slot_used")
                    .eq("id", commissionTypeId)
                    .single();
        
                if (!commission) {
                    alert("Commission tidak ditemukan.");
                    return;
                }
        
                let newSlotUsed =
                    commission.slot_used ?? 0;
        
                if (!oldActive && newActive) {
                    newSlotUsed += 1;
                }
        
                if (oldActive && !newActive) {
                    newSlotUsed -= 1;
        
                    if (newSlotUsed < 0) {
                        newSlotUsed = 0;
                    }
                }
        
                const { error: orderError } =
                    await supabase
                        .from("orders")
                        .update({
                            status,
                        })
                        .eq("id", orderId);
        
                if (orderError) {
                    throw orderError;
                }
        
                if (
                    newSlotUsed !==
                    commission.slot_used
                ) {
                    const {
                        error: commissionError,
                    } = await supabase
                        .from("commission_types")
                        .update({
                            slot_used: newSlotUsed,
                        })
                        .eq(
                            "id",
                            commissionTypeId
                        );
        
                    if (commissionError) {
                        throw commissionError;
                    }
                }
        
                alert(
                    "Status berhasil diperbarui."
                );
        
                router.refresh();
            } catch (err) {
                console.error(err);
        
                alert(
                    "Gagal mengubah status."
                );
            } finally {
                setLoading(false);
            }
        }

    return (
        <div
        className="
            mt-6
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-5
        "
        >
        <h3 className="font-semibold mb-3">
            Update Status
        </h3>

        <select
            value={status}
            onChange={(e) =>
            setStatus(e.target.value)
            }
            className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-black/20
            px-4
            py-2
            mb-3
            "
        >
            <option value="Pending">
            Pending
            </option>

            <option value="Accepted">
            Accepted
            </option>

            <option value="In Progress">
            In Progress
            </option>

            <option value="Completed">
            Completed
            </option>

            <option value="Rejected">
            Rejected
            </option>
        </select>

        <button
            onClick={handleSave}
            disabled={loading}
            className="
            px-5
            py-3
            rounded-xl
            bg-gray-900/30 
            text-gray-900
            border-gray-500/30
            text-white
            font-semibold
            hover:bg-emerald-400
            hover:text-black
            disabled:opacity-50
            "
        >
            {loading
            ? "Menyimpan..."
            : "Save Status"}
        </button>
        </div>
    );
}