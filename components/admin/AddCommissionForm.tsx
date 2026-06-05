"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddCommissionForm() {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [basePrice, setBasePrice] =
        useState("");

    const [slotLimit, setSlotLimit] =
        useState("3");

    const [isActive, setIsActive] =
        useState(true);

    async function handleSubmit() {
        try {
            if (!name.trim()) {
                alert("Nama commission wajib diisi.");
                return;
            }

            setLoading(true);

            const { error } =
                await supabase
                    .from("commission_types")
                    .insert({
                        name,
                        description,
                        base_price:
                            Number(basePrice),
                        slot_limit:
                            Number(slotLimit),
                        slot_used: 0,
                        is_active:
                            isActive,
                    });

            if (error) {
                throw error;
            }

            alert(
                "Commission berhasil dibuat."
            );

            setName("");
            setDescription("");
            setBasePrice("");
            setSlotLimit("3");
            setIsActive(true);

            router.refresh();
        } catch (err) {
            console.error(err);

            alert(
                "Gagal membuat commission."
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
                mb-8
            "
        >
            <h2 className="text-2xl font-bold mb-6">
                Add Commission
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                <input
                    type="text"
                    placeholder="Commission Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        px-4
                        py-3
                    "
                />

                <input
                    type="number"
                    placeholder="Base Price"
                    value={basePrice}
                    onChange={(e) =>
                        setBasePrice(
                            e.target.value
                        )
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        px-4
                        py-3
                    "
                />

                <input
                    type="number"
                    placeholder="Slot Limit"
                    value={slotLimit}
                    onChange={(e) =>
                        setSlotLimit(
                            e.target.value
                        )
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        px-4
                        py-3
                    "
                />

                <label
                    className="
                        flex
                        items-center
                        gap-3
                        px-4
                    "
                >
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) =>
                            setIsActive(
                                e.target.checked
                            )
                        }
                    />

                    Active
                </label>

            </div>

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
                rows={4}
                className="
                    mt-4
                    w-full
                    rounded-xl
                    bg-black/20
                    border
                    border-white/10
                    px-4
                    py-3
                "
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                    mt-6
                    px-6
                    py-3
                    rounded-xl
                    bg-emerald-500
                    text-black
                    font-semibold
                    hover:bg-emerald-400
                "
            >
                {loading
                    ? "Creating..."
                    : "Add Commission"}
            </button>
        </div>
    );
}