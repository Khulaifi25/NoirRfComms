"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
    AnimatePresence,
    motion,
} from "framer-motion";

type PortfolioItem = {
    id: number;
    sort_order: number;
};

export default function AddPortfolioForm({
    items,
}: {
    items: PortfolioItem[];
}) {

    const router = useRouter();

    const [showModal, setShowModal] =
        useState(false);

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [category, setCategory] =
        useState("Bust Up");

    const [featured, setFeatured] =
        useState(false);

    const [imageUrl, setImageUrl] =
        useState("");

    const [uploading, setUploading] =
        useState(false);
    
    const [publicId, setPublicId] =
    useState("");

    async function uploadImage(
        file: File
    ) {
        try {

            setUploading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "upload_preset",
                process.env
                    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );

            const response =
                await fetch(
                    `https://api.cloudinary.com/v1_1/${
                        process.env
                            .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                    }/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

            const data =
                await response.json();

            setImageUrl(
                data.secure_url
            );
            setPublicId(
                data.public_id
            );

        } catch (err) {

            console.error(err);

            alert(
                "Upload gagal."
            );

        } finally {

            setUploading(false);

        }
    }

    async function saveArtwork() {

        try {

            if (!title.trim()) {
                alert(
                    "Title wajib diisi."
                );
                return;
            }

            if (!imageUrl) {
                alert(
                    "Upload gambar terlebih dahulu."
                );
                return;
            }

            const maxSortOrder =
                items.length > 0
                    ? Math.max(
                        ...items.map(
                            (item) =>
                                item.sort_order ?? 0
                        )
                    )
                    : 0;

            const nextSortOrder =
                maxSortOrder + 1;
            
            if (featured) {
                const { count } =
                    await supabase
                        .from("portfolio")
                        .select("*", {
                            count: "exact",
                            head: true,
                        })
                        .eq(
                            "is_featured",
                            true
                        );
                if (
                    (count ?? 0) >= 3
                ) {
                    alert(
                        "Maximum 3 featured artworks."
                    );
                    return;
                }
            }

            const { error } =
                await supabase
                    .from("portfolio")
                    .insert({
                        title,
                        description,
                        category,
                        image_url:
                            imageUrl,
                        public_id: publicId,
                        sort_order:
                            nextSortOrder,
                        is_featured:
                            featured,
                    });

            if (error) {
                throw error;
            }

            alert(
                "Artwork berhasil ditambahkan."
            );

            setTitle("");
            setDescription("");
            setCategory("Bust Up");
            setFeatured(false);
            setImageUrl("");


            setShowModal(false);

            router.refresh();
            window.location.reload();

        } catch (err) {

            console.error(err);

            alert(
                "Gagal menyimpan artwork."
            );
        }
    }

    return (
        <>
            <button
                onClick={() =>
                    setShowModal(true)
                }
                className="
                    px-5
                    py-3
                    rounded-full
                    border
                    bg-blue-500/60
                    text-black
                    backdrop-blur-xl
                    border-blue-500/30
                    font-semibold
                    hover:bg-gray-900/75
                    hover:text-white
                    transition
                "
            >
                + Add Artwork
            </button>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        onClick={() =>
                            setShowModal(false)
                        }
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="
                            fixed
                            inset-0
                            z-50
                            bg-slate-950/60
                            backdrop-blur-xl
                            flex
                            items-center
                            justify-center
                            p-4
                        "
                    >
                        <motion.div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                            }}
                            className="
                                w-full
                                max-w-2xl
                                rounded-4xl
                                bg-[#81b4b4]/80
                                backdrop-blur-2xl
                                border
                                border-gray-800/20
                                shadow-[0_0_60px_rgba(47, 125, 87, 0.738)]
                                p-8
                            "
                        >
                            <h3 className="text-2xl font-bold mb-6">
                                Add Artwork
                            </h3>

                            <div className="space-y-4">

                                <input
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
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

                                <textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    rows={3}
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-black/20
                                        border
                                        border-white/10
                                        p-3
                                    "
                                />

                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-black/20
                                        border
                                        border-white/10
                                        p-3
                                    "
                                >
                                    <option>Bust Up</option>
                                    <option>Half Body</option>
                                    <option>Knee Up</option>
                                    <option>Full Body</option>
                                    <option>Chibi</option>
                                </select>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={featured}
                                        onChange={(e) =>
                                            setFeatured(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Featured Artwork
                                </label>

                                <label
                                    className="
                                        block
                                        cursor-pointer
                                        rounded-2xl
                                        border-2
                                        border-dashed
                                        border-blue-400/20
                                        bg-white/5
                                        hover:bg-white/10
                                        transition
                                        p-8
                                        text-center
                                    "
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target
                                                    .files?.[0];

                                            if (file) {
                                                uploadImage(
                                                    file
                                                );
                                            }
                                        }}
                                    />

                                    <div className="space-y-2">
                                        <div className="text-5xl">
                                            🖼️
                                        </div>

                                        <div className="font-semibold">
                                            Click to Upload Artwork
                                        </div>

                                        <div className="text-sm opacity-60">
                                            PNG, JPG, WEBP
                                        </div>
                                    </div>
                                </label>

                                {uploading && (
                                    <div className="text-center text-sm opacity-70">
                                        Uploading image...
                                    </div>
                                )}

                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        alt="preview"
                                        width={600}
                                        height={800}
                                        className="
                                            w-40
                                            mx-auto
                                            rounded-xl
                                        "
                                    />
                                )}
                            </div>

                            <div
                                className="
                                    flex
                                    justify-end
                                    gap-3
                                    mt-8
                                "
                            >
                                <button
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-white/10
                                        hover:bg-red-500/60
                                        transition
                                        font-semibold
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={saveArtwork}
                                    disabled={uploading}
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
                                    {uploading
                                        ? "Uploading..."
                                        : "Save Artwork"}
                                </button>
                                </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}