"use client";

import { supabase } from "@/lib/supabase";
import { useMemo, useState } from "react";
import {
    IconBrush,
    IconUsers,
    IconPhoto,
    IconReceiptDollar,
    IconWriting,
    IconAt,
    IconMail,
    IconPlaylistAdd,
    IconSignature,
    IconLink,
    } from "@tabler/icons-react";

    type CommissionType = {
    id: number;
    name: string;
    base_price: number;
    slot_limit: number;
    slot_used: number;
    };

    type Addon = {
    id: number;
    name: string;
    price: number;
    price_type: "fixed" | "percentage";
    category: string;
    input_type: string;
    };

    interface Props {
    commissions: CommissionType[];
    addons: Addon[];
    defaultCommissionId?: number;
    }

    export default function OrderForm({
    commissions,
    addons,
    defaultCommissionId,
    }: Props) {

    const [clientName, setClientName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [referenceLink, setReferenceLink] = useState("");
    const [selectedCommission, setSelectedCommission] =
        useState<number | null>(
            defaultCommissionId ?? null
        );

    const [selectedAddons, setSelectedAddons] =
        useState<number[]>([]);

    const [selectedBackground, setSelectedBackground] =
        useState<number | null>(null);

    const [extraCharacterCount, setExtraCharacterCount] =
        useState(0);

    const checkboxAddons = addons.filter(
        (item) =>
        item.category === "General" &&
        item.input_type === "checkbox"
    );

    const backgrounds = addons.filter(
        (item) =>
        item.category === "Background" &&
        item.input_type === "select"
    );

    const extraCharacterAddon = addons.find(
        (item) => item.name === "Extra Character"
    );

    const currentCommission =
    commissions.find(
        (c) => c.id === selectedCommission
    );

    const slotLeft =
    currentCommission
        ? currentCommission.slot_limit -
        currentCommission.slot_used
        : null;

    const inputClass = `
        w-full
        rounded-2xl
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-md
        border
        border-emerald-300
        dark:border-emerald-700
        px-4
        py-3
        text-black
        dark:text-white
        outline-none
        focus:ring-2
        focus:ring-emerald-400
        transition-all
    `;

    const totalPrice = useMemo(() => {
        if (!selectedCommission) return 0;

        const commission = commissions.find(
        (item) => item.id === selectedCommission
        );

        if (!commission) return 0;

        const basePrice = commission.base_price;

        let total = basePrice;

        const selectedItems = addons.filter(
        (addon) =>
            selectedAddons.includes(addon.id) ||
            addon.id === selectedBackground
        );

        selectedItems.forEach((addon) => {
        if (addon.price_type === "percentage") {
            total +=
            (basePrice * addon.price) / 100;
        } else {
            total += addon.price;
        }
        });

        if (
        extraCharacterAddon &&
        extraCharacterCount > 0
        ) {
        total +=
            ((basePrice *
            extraCharacterAddon.price) /
            100) *
            extraCharacterCount;
        }

        return total;
    }, [
        selectedCommission,
        selectedAddons,
        selectedBackground,
        extraCharacterCount,
        commissions,
        addons,
        extraCharacterAddon,
    ]);

    const [loading, setLoading] = useState(false);

    const isSlotFull =
        selectedCommission !== null &&
        slotLeft !== null &&
        slotLeft <= 0;

    async function handleSubmit() {
    try {
        if (!clientName.trim()) {
        alert("Nama Client wajib diisi.");
        return;
        }

        if (!contact.trim()) {
        alert("Contact wajib diisi.");
        return;
        }

        if (!email.trim()) {
        alert("Email wajib diisi.");
        return;
        }

        if (!selectedCommission) {
        alert("Pilih commission terlebih dahulu.");
        return;
        }

        setLoading(true);

        const { error } = await supabase
        .from("orders")
        .insert({
            client_name: clientName,
            contact,
            email,
            commission_type_id: selectedCommission,
            addon_ids: selectedAddons,
            background_addon_id: selectedBackground,
            extra_character_count: extraCharacterCount,
            description,
            reference_link: referenceLink,
            total_price: totalPrice,
        });

        if (error) {
        console.error(error);
        alert(
            "Gagal mengirim order. Silakan coba lagi."
        );
        return;
        }

        await fetch(
            "/api/discord/order",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    client_name: clientName,
                    contact,
                    email,
                    commission_type:
                        currentCommission?.name,
                    total_price:
                        totalPrice,
                    reference_link:
                        referenceLink,
                }),
            }
        );

        alert(
        "Order berhasil dikirim! Silakan tunggu saya menghubungi Anda."
        );

        // reset form

        setClientName("");
        setContact("");
        setEmail("");
        setDescription("");
        setReferenceLink("");

        // reset pilihan commission
        setSelectedCommission(
            defaultCommissionId ?? null
        );

        setSelectedAddons([]);
        setSelectedBackground(null);
        setExtraCharacterCount(0);

    } catch (err) {
        console.error(err);

        alert(
        "Terjadi kesalahan saat mengirim order."
        );
    } finally {
        setLoading(false);
    }
    }

return (
    <div
        className="
            rounded-3xl
            bg-white/50
            dark:bg-zinc-950/40
            backdrop-blur-xl
            border
            border-white/20
            shadow-xl
            p-6 md:p-8
        "
        >

         {/* NAME */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconWriting size={22} />
            <label className="block font-semibold text-black dark:text-white">
            Nama Client
            </label>
            </div>

            <input
            type="text"
            value={clientName}
            onChange={(e) =>
                setClientName(e.target.value)
            }
            placeholder="Nama anda..."
            className={inputClass}
            />
        </div>

        {/* CONTACT */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconAt size={22} />
            <label className="block font-semibold text-black dark:text-white">
            Discord / Telegram / WA
            </label>
            </div>

            <input
            type="text"
            value={contact}
            onChange={(e) =>
                setContact(e.target.value)
            }
            placeholder="@username / 08xxxxxxxx"
            className={inputClass}
            />
        </div>

        {/* EMAIL */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconMail size={22} />
            <label className="block font-semibold text-black dark:text-white">
            Email
            </label>
            </div>

            <input
            type="email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            placeholder="email@example.com"
            className={inputClass}
            />
        </div>

        {/* COMMISSION */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconBrush size={22} />
            <label className="font-semibold">
                Jenis Commission
            </label>
            </div>

            <select
            value={selectedCommission ?? ""}
            className={inputClass}
            onChange={(e) =>{
                const value = e.target.value;
                setSelectedCommission(
                    value === ""
                    ? null
                    : Number(value)
                );
            }}
            >
            <option value="">
                Pilih Commission
            </option>

            {commissions.map((item) => (
                <option
                key={item.id}
                value={item.id}
                >
                {item.name} —
                Rp {item.base_price.toLocaleString("id-ID")}
                {item.slot_limit - item.slot_used <= 0
                    ? " (FULL)"
                    : ""}
                </option>
            ))}
            
            </select>
            {isSlotFull && (
                    <div
                    className="
                        mt-3
                        rounded-2xl
                        border
                        border-red-500/30
                        bg-red-600/15
                        p-4
                        text-red-500
                        backdrop-blur-md
                    "
                    >
                    ⚠ Commission ini sedang FULL.
                    Silakan pilih kategori lain atau
                    tunggu slot dibuka kembali.
                    </div>
                )}
        </div>

        {/* ADDONS */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconPlaylistAdd size={22} />
            <h2 className="font-semibold text-lg text-black dark:text-white">
            Add-ons *(Optional)
            </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
            {checkboxAddons.map((item) => (
                <label
                key={item.id}
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-emerald-300
                dark:border-emerald-700
                bg-white/60
                dark:bg-zinc-900/50
                backdrop-blur-md
                p-4
                cursor-pointer
                hover:border-emerald-500
                text-black
                dark:text-white
                transition-all
                "
                >
                <div>
                    <p className="font-semibold">
                    {item.name}
                    </p>

                    <p className="text-sm opacity-70">
                    {item.price_type ===
                    "percentage"
                        ? `+${item.price}%`
                        : `+Rp ${item.price.toLocaleString(
                            "id-ID"
                        )}`}
                    </p>
                </div>

                <input
                    type="checkbox"
                    checked={selectedAddons.includes(
                    item.id
                    )}
                    onChange={(e) => {
                    if (e.target.checked) {
                        setSelectedAddons([
                        ...selectedAddons,
                        item.id,
                        ]);
                    } else {
                        setSelectedAddons(
                        selectedAddons.filter(
                            (id) =>
                            id !== item.id
                        )
                        );
                    }
                    }}
                    className="
                    w-5
                    h-5
                    accent-emerald-500
                    "
                />
                </label>
            ))}
            </div>
        </div>

        {/* EXTRA CHARACTER */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconUsers size={22} />
            <label className="font-semibold">
                Extra Character (+80%)
            </label>
            </div>

            <select
            value={extraCharacterCount}
            onChange={(e) =>
                setExtraCharacterCount(
                Number(e.target.value)
                )
            }
            className={inputClass}
            >
            {Array.from({
                length: 11,
            }).map((_, i) => (
                <option
                key={i}
                value={i}
                >
                {i === 0
                    ? "Tidak ada"
                    : `${i} Character`}
                </option>
            ))}
            </select>
        </div>

        {/* BACKGROUND */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconPhoto size={22} />
            <label className="font-semibold">
                Background
            </label>
            </div>

            <select
            onChange={(e) => {
                const value = e.target.value;
            
                setSelectedBackground(
                value === ""
                    ? null
                    : Number(value)
                );
            }}
            className={inputClass}
            >
            <option value="">
                Pilih Background
            </option>

            {backgrounds.map((item) => (
                <option
                key={item.id}
                value={item.id}
                >
                    {item.name}
                    {item.price > 0 &&
                    (item.price_type === "percentage"
                        ? ` (+${item.price}%)`
                        : ` (+Rp ${item.price.toLocaleString("id-ID")})`
                    )}
                </option>
            ))}
            </select>
        </div>

        {/* DESCRIPTION */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
            <IconSignature size={22} />
            <label className="block font-semibold text-black dark:text-white">
            Deskripsi Karakter *(Optional)
            </label>
            </div>

            <textarea
            value={description}
            onChange={(e) =>
                setDescription(e.target.value)
            }
            rows={6}
            placeholder="Jelaskan karakter, pose, ekspresi, outfit, warna, dan detail lainnya..."
            className={`${inputClass} resize-none`}
            />
        </div>

        {/* REFERENCE */}

        <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
                <IconLink size={22} />
                <label className="block font-semibold text-black dark:text-white">
                Link Referensi
                </label>
            </div>

            <input
                type="url"
                value={referenceLink}
                onChange={(e) =>
                    setReferenceLink(e.target.value)
                }
                placeholder="https://...     (*usahakan link Google Drive)"
                className={inputClass}
            />
            <p className="mt-2 ml-2 text-sm italic opacity-70 text-black dark:text-white">
                *Pastikan link memiliki akses publik agar dapat diakses.
            </p>
        </div>
        

        {/* PRICE */}

        <div
            className="
            mt-8
            rounded-3xl
            bg-linear-to-r
            from-emerald-100/80
            to-green-100/80
            dark:from-emerald-900/40
            dark:to-green-900/40
            backdrop-blur-xl
            border
            border-emerald-400/30
            p-6
            "
        >
        <div className="flex items-center gap-2 mb-2">
            <IconReceiptDollar
                size={24}
                className="text-emerald-500"
            />

            <p className="text-sm opacity-70 text-black dark:text-white">
                Estimasi Harga
            </p>
            </div>

            <h2 className="text-4xl font-bold text-emerald-500">
            Rp{" "}
            {totalPrice.toLocaleString(
                "id-ID"
            )}
            </h2>

            <p className="text-sm mt-3 opacity-70 text-black dark:text-white">
            Harga final akan dikonfirmasi
            setelah diskusi dan pengecekan
            detail commission.
            </p>

            <div className="mt-4 space-y-2 text-sm text-black dark:text-white">
            <div>
                <span className="font-semibold">
                Commission:
                </span>{" "}
                {
                commissions.find(
                    (c) => c.id === selectedCommission
                )?.name ?? "-"
                }
            </div>

            <div>
                <span className="font-semibold">
                Extra Character:
                </span>{" "}
                {extraCharacterCount}
            </div>

            <div>
                <span className="font-semibold">
                Background:
                </span>{" "}
                {
                backgrounds.find(
                    (bg) =>
                    bg.id === selectedBackground
                )?.name ?? "-"
                }
            </div>

            {selectedAddons.length > 0 && (
                <div>
                <span className="font-semibold">
                    Add-ons:
                </span>

                <ul className="list-disc ml-5 mt-1">
                    {addons
                    .filter((addon) =>
                        selectedAddons.includes(
                        addon.id
                        )
                    )
                    .map((addon) => (
                        <li key={addon.id}>
                        {addon.name}
                        </li>
                    ))}
                </ul>
                </div>
            )}

            </div>
            
        </div>
        
        <button
        type="button"
        onClick={handleSubmit}
        disabled={
            (selectedCommission !== null &&
                slotLeft !== null &&
                slotLeft <= 0) ||
            loading
            }
        className={`
            mt-6
            w-full
            rounded-2xl
            py-4
            font-semibold
            text-lg
            transition-all
            duration-300
            shadow-lg

            ${
            isSlotFull
                ? "bg-gray-500 cursor-not-allowed text-white"
                : loading
                ? "bg-emerald-400 cursor-wait text-gray-950"
                : "bg-emerald-500 hover:bg-emerald-600 text-gray-950 hover:shadow-emerald-500/30"
            }
        `}
        >
        {isSlotFull
            ? "Slot Full"
            : loading
            ? "Mengirim..."
            : "Submit Order"}
        </button>
    </div>
    );
}