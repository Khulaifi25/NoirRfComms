"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Commission = {
    id: number;
    name: string;
    description: string;
    base_price: number;
    slot_limit: number;
    slot_used: number;
    is_active: boolean;
};

    export default function CommissionTable({
    commissions,
    }: {
    commissions: Commission[];
    }) {
    const router = useRouter();

    const [loadingId, setLoadingId] =
        useState<number | null>(null);

    async function saveCommission(
        commission: Commission
    ) {
        try {
        setLoadingId(commission.id);

        const { error } =
            await supabase
            .from("commission_types")
            .update({
                name: commission.name,
                description:
                commission.description,
                base_price:
                commission.base_price,
                slot_limit:
                commission.slot_limit,
                slot_used:
                commission.slot_used,
                is_active:
                commission.is_active,
            })
            .eq("id", commission.id);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Saved!");

        router.refresh();
        } finally {
        setLoadingId(null);
        }
    }

    return (
        <div
        className="
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            overflow-x-auto
        "
        >
        <table className="w-full">
            <thead>
            <tr className="border-b border-white/10">

                <th className="p-4 text-left">
                Commission
                </th>

                <th className="p-4 text-left">
                Description
                </th>

                <th className="p-4 text-left">
                Price
                </th>

                <th className="p-4 text-left">
                Slot
                </th>

                <th className="p-4 text-left">
                Used
                </th>

                <th className="p-4 text-left">
                Active
                </th>

                <th className="p-4 text-left">
                Action
                </th>

                <th className="p-4 text-left">
                Delete
                </th>

            </tr>
            </thead>

            <tbody>

            {commissions.map((item) => (
                <CommissionRow
                key={item.id}
                item={item}
                onSave={saveCommission}
                loading={
                    loadingId === item.id
                }
                />
            ))}

            </tbody>
        </table>
        </div>
    );
}

    

    function CommissionRow({
    item,
    onSave,
    loading,
    }: {
    item: Commission;
    onSave: (
        commission: Commission
    ) => void;
    loading: boolean;
    }) {
    
    const [data, setData] =
        useState(item);
    
    const router = useRouter();

    async function handleDelete(
        id: number
    ) {
        const confirmDelete =
                confirm(
                    "Hapus commission ini?"
                );
        
        if (!confirmDelete) {
                return;
            }
        
        try {
            const { error } =
                await supabase
                        .from("commission_types")
                        .delete()
                        .eq("id", id);
        
                if (error) {
                    throw error;
                }
        
                alert(
                    "Commission berhasil dihapus."
                );
        
                router.refresh();
            } catch (err) {
                console.error(err);
        
                alert(
                    "Gagal menghapus commission."
                );
            }
        }

    return (
        <tr
        className="
            border-b
            border-white/5
        "
        >
        <td className="p-4">
            <input
            value={data.name}
            onChange={(e) =>
                setData({
                ...data,
                name: e.target.value,
                })
            }
            className="
                rounded-xl
                bg-black/20
                px-3 py-2
            "
            />
        </td>

        <td>
            <textarea
                value={data.description ?? ""}
                onChange={(e) =>
                    setData({
                        ...data,
                        description:
                            e.target.value,
                    })
                }
                className="
                    w-full
                    rounded-xl
                    bg-black/20
                    border
                    border-white/10
                    p-3
                "
            />
        </td>

        <td className="p-4">
            <input
            type="number"
            value={data.base_price}
            onChange={(e) =>
                setData({
                ...data,
                base_price:
                    Number(
                    e.target.value
                    ),
                })
            }
            className="
                rounded-xl
                bg-black/20
                px-3 py-2
            "
            />
        </td>

        <td className="p-4">
            <input
            type="number"
            value={data.slot_limit}
            onChange={(e) =>
                setData({
                ...data,
                slot_limit:
                    Number(
                    e.target.value
                    ),
                })
            }
            className="
                rounded-xl
                bg-black/20
                px-3 py-2
                w-24
            "
            />
        </td>

        <td className="p-4">
            {data.slot_used}
        </td>

        <td className="p-4">
            <input
            type="checkbox"
            checked={data.is_active}
            onChange={(e) =>
                setData({
                ...data,
                is_active:
                    e.target.checked,
                })
            }
            />
        </td>

        <td className="p-4">
            <button
            onClick={() =>
                onSave(data)
            }
            disabled={loading}
            className="
                px-4 py-2
                rounded-xl
                bg-blue-500/20
                text-gray-900
                hover:bg-blue-500
                hover:text-white
                font-bold
                transition
            "
            >
            {loading
                ? "Saving..."
                : "Save"}
            </button>
        </td>

        <td>
            <button
                onClick={() =>
                    handleDelete(item.id)
                }
                className="
                    px-4 py-2
                    rounded-xl
                    bg-red-500/20
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    font-bold
                    transition
                "
            >
                Delete
            </button>
        </td>
        </tr>
    );
}