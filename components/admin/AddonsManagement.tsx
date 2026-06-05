"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Addon = {
    id: number;
    name: string;
    price: number;
    price_type: string;
    category: string;
    input_type: string;
    is_active: boolean;
    sort_order: number;
    is_protected: boolean;
};

export default function AddonsManagement({
    addons,
}: {
    addons: Addon[];
}) {
    const router = useRouter();

    const [newAddon, setNewAddon] = useState({
        name: "",
        price: 0,
        price_type: "fixed",
        category: "General",
        input_type: "checkbox",
        sort_order: 1,
        is_active: true,
    });


    async function addAddon() {
        try {
            if (!newAddon.name.trim()) {
                alert("Nama addon wajib diisi.");
                return;
            }

            const { data: lastAddon } =
            await supabase
                .from("commission_addons")
                .select("sort_order")
                .eq(
                    "category",
                    newAddon.category
                )
                .order(
                    "sort_order",
                    { ascending: false }
                )
                .limit(1)
                .single();

            const nextSortOrder =
                (lastAddon?.sort_order ?? 0) + 1;

                const { error } =
                await supabase
                    .from("commission_addons")
                    .insert({
                        ...newAddon,
                        sort_order:
                            nextSortOrder,
                    });
    
            if (error) {
                throw error;
            }
    
            alert(
                "Addon berhasil ditambahkan."
            );

            setNewAddon({
                name: "",
                price: 0,
                price_type: "fixed",
                category: "General",
                input_type: "checkbox",
                sort_order: 1,
                is_active: true,
            });

            router.refresh();
        } catch (err) {
            console.error(err);
            alert("Gagal menambah addon.");
        }
    }

    const generalAddons =
    addons.filter(
        (addon) =>
            addon.category === "General"
    );

    const backgroundAddons =
        addons.filter(
            (addon) =>
                addon.category === "Background"
        );

    return (
        <div
            className="
                mt-10
                rounded-3xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                p-6
            "
        >
            <h2 className="text-2xl font-bold mb-6">
                Addons Management
            </h2>

            {/* FORM TAMBAH */}

            <div className="grid md:grid-cols-2 gap-4 mb-8">

                <input
                    placeholder="Addon Name"
                    value={newAddon.name}
                    onChange={(e) =>
                        setNewAddon({
                            ...newAddon,
                            name: e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        p-3
                    "
                    
                />
                

                <input
                    type="number"
                    placeholder="Price"
                    value={newAddon.price}
                    onChange={(e) =>
                        setNewAddon({
                            ...newAddon,
                            price: Number(e.target.value),
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        p-3
                    "
                />

                <select
                    value={newAddon.price_type}
                    onChange={(e) =>
                        setNewAddon({
                            ...newAddon,
                            price_type: e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        p-3
                    "
                >
                    <option value="fixed">
                        Fixed
                    </option>

                    <option value="percentage">
                        Percentage
                    </option>
                </select>

                <select
                    value={newAddon.category}
                    onChange={(e) =>
                        setNewAddon({
                            ...newAddon,
                            category: e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        p-3
                    "
                >
                    <option value="General">
                        General
                    </option>

                    <option value="Background">
                        Background
                    </option>
                </select>

                <select
                    value={newAddon.input_type}
                    onChange={(e) =>
                        setNewAddon({
                            ...newAddon,
                            input_type: e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        border
                        border-white/10
                        p-3
                    "
                >
                    <option value="checkbox">
                        Checkbox
                    </option>

                    <option value="select">
                        Select
                    </option>
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={newAddon.is_active}
                        onChange={(e) =>
                            setNewAddon({
                                ...newAddon,
                                is_active: e.target.checked,
                            })
                        }
                    />
                    Active
                </label>

            </div>

            <button
                onClick={addAddon}
                className="
                    px-5
                    py-3
                    rounded-xl
                    bg-emerald-500
                    text-black
                    font-semibold
                    hover:bg-emerald-400
                "
            >
                Add Addon
            </button>

            {/* TABLE */}

            <div className="mt-8 overflow-x-auto">
                <table className="w-full">

                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Type
                            </th>

                            <th className="p-4 text-left">
                                Category
                            </th>

                            <th className="p-4 text-left">
                                Sort
                            </th>

                            <th className="p-4 text-left">
                                Input
                            </th>

                            <th className="p-4 text-left">
                                Active
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td
                            colSpan={8}
                            className="
                                p-4
                                text-xl
                                font-semibold
                            "
                        >
                            General Addons
                        </td>
                    </tr>

                    {generalAddons.map((addon) => (
                        <AddonRow
                            key={addon.id}
                            addon={addon}
                        />
                    ))}

                    <tr>
                        <td
                            colSpan={8}
                            className="
                                p-4
                                text-xl
                                font-semibold
                            "
                        >
                            Background Addons
                        </td>
                    </tr>

                    {backgroundAddons.map((addon) => (
                        <AddonRow
                            key={addon.id}
                            addon={addon}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AddonRow({
    addon,
}: {
    addon: Addon;
}) {

    const router = useRouter();

    const [data, setData] =
        useState(addon);

    const isProtected =
        data.is_protected;

    async function saveAddon() {
        try {
            const { error } =
                await supabase
                    .from("commission_addons")
                    .update({
                        name: data.name,
                        price: data.price,
                        price_type:
                            data.price_type,
                        category:
                            data.category,
                        input_type:
                            data.input_type,
                        is_active:
                            data.is_active,
                        sort_order:
                            data.sort_order,
                            
                    })
                    .eq("id", data.id);

            if (error) throw error;

            alert("Addon berhasil disimpan.");

            router.refresh();

        } catch (err) {
            console.error(err);
            alert("Gagal menyimpan addon.");
        }
    }


    async function deleteAddon() {
        if (isProtected) {
            alert(
                "Addon ini diproteksi dan tidak dapat dihapus."
            );
            return;
        }

        const confirmDelete =
            confirm(
                "Hapus addon ini?"
            );

        if (!confirmDelete) return;

        try {
            const { error } =
                await supabase
                    .from("commission_addons")
                    .delete()
                    .eq("id", data.id);

            if (error) throw error;

            alert("Addon berhasil dihapus.");

            router.refresh();

        } catch (err) {
            console.error(err);
            alert("Gagal menghapus addon.");
        }
    }

    return (
        <tr className="border-b border-white/5">
            <td className="p-3">
                <input
                    value={data.name}
                    onChange={(e) =>
                        setData({
                            ...data,
                            name: e.target.value,
                        })
                    }
                    className="
                        w-full
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                />

                {isProtected && (
                    <div
                        className="
                            mt-2
                            inline-flex
                            px-2
                            py-1
                            rounded-full
                            text-xs
                            bg-yellow-500/20
                            text-yellow-400
                        "
                    >
                        Protected
                    </div>
                )}
            </td>

            <td className="p-3">
                <input
                    type="number"
                    value={data.price}
                    onChange={(e) =>
                        setData({
                            ...data,
                            price: Number(
                                e.target.value
                            ),
                        })
                    }
                    className="
                        w-full
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                />
            </td>

            <td className="p-3">

                <select
                    value={data.price_type}
                    onChange={(e) =>
                        setData({
                            ...data,
                            price_type:
                                e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                >
                    <option value="fixed">
                        Fixed
                    </option>

                    <option value="percentage">
                        Percentage
                    </option>
                </select>

            </td>

            <td className="p-3">
                <select
                    disabled={isProtected}
                    value={data.category}
                    onChange={(e) =>
                        setData({
                            ...data,
                            category:
                                e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                >
                    <option value="General">
                        General
                    </option>

                    <option value="Background">
                        Background
                    </option>
                </select>
            </td>

            <td className="p-3">
                <input
                    type="number"
                    value={data.sort_order}
                    onChange={(e) =>
                        setData({
                            ...data,
                            sort_order: Number(
                                e.target.value
                            ),
                        })
                    }
                    className="
                        w-24
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                />
            </td>

            <td className="p-3">

                <select
                    disabled={isProtected}
                    value={data.input_type}
                    onChange={(e) =>
                        setData({
                            ...data,
                            input_type:
                                e.target.value,
                        })
                    }
                    className="
                        rounded-xl
                        bg-black/20
                        p-2
                    "
                >
                    <option value="checkbox">
                        Checkbox
                    </option>

                    <option value="select">
                        Select
                    </option>
                </select>

            </td>

            <td className="p-3">
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

            <td className="p-3 flex gap-2">

                <button
                    onClick={saveAddon}
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-500/20
                        text-gray-900
                        hover:bg-blue-500
                        hover:text-white
                        font-semibold
                    "
                >
                    Save
                </button>

                <button
                    onClick={deleteAddon}
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500/20
                        text-red-400
                        hover:bg-red-500
                        hover:text-white
                        font-semibold
                    "
                >
                    Delete
                </button>

            </td>

        </tr>
    );
}