"use client";


import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
} from "framer-motion";

type PortfolioItem = {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    sort_order: number;
    is_featured: boolean;
};


export default function EditPortfolioModal({
    item,
    onClose,
}: {
    item: PortfolioItem;
    onClose: () => void;
}) {

    const router = useRouter();

    const [title, setTitle] =
    useState(item.title);

    const [description, setDescription] =
        useState(item.description ?? "");

    const [category, setCategory] =
        useState(item.category);

    const [featured, setFeatured] =
        useState(item.is_featured);

    const [imageUrl, setImageUrl] =
        useState(item.image_url);

    const [saving, setSaving] =
    useState(false);

    const [uploading, setUploading] =
    useState(false);

    async function saveChanges() {
        try {
            setSaving(true);
            if (
                featured &&
                !item.is_featured
            ) {
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
                    .update({
                        title,
                        description,
                        category,
                        image_url: imageUrl,
                        is_featured: featured,
                    })
                    .eq("id", item.id);
            if (error) {
                throw error;
            }
            alert(
                "Artwork updated."
            );
            onClose();
            router.refresh();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(
                "Failed to update artwork."
            );
        } finally {
            setSaving(false);
        }
    }

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
    
        } catch (err) {
    
            console.error(err);
    
            alert(
                "Upload gagal."
            );
    
        } finally {
    
            setUploading(false);
    
        }
    }

    return (
        <AnimatePresence>

            <motion.div
                onClick={onClose}
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
                    bg-black/70
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
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
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

                    <h2
                        className="
                            text-2xl
                            font-bold
                            mb-6
                        "
                    >
                        Edit Artwork
                    </h2>

                    <div className="space-y-4">
                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(
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
                    />

                    <textarea
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

                    <label
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
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
                    <Image
                        src={imageUrl}
                        alt="preview"
                        width={400}
                        height={600}
                        className="
                            w-40
                            rounded-xl
                            mx-auto
                        "
                    />
                    <label
                        className="
                            mt-4
                            block
                            cursor-pointer
                            rounded-2xl
                            border-2
                            border-dashed
                            border-blue-400/20
                            bg-white/5
                            hover:bg-white/10
                            transition
                            p-6
                            text-center
                        "
                    >

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file =
                                    e.target.files?.[0];
                                if (file) {
                                    uploadImage(file);
                                }
                            }}
                        />
                        <div className="space-y-2">
                            <div className="text-3xl">
                                🔄
                            </div>
                            <div className="font-medium">
                                Replace Image
                            </div>
                            <div className="text-sm opacity-60">
                                PNG, JPG, WEBP
                            </div>
                        </div>
                    </label>
                    {uploading && (
                    <div
                        className="
                            text-center
                            text-sm
                            opacity-70
                        "
                    >
                        Uploading image...
                    </div>
                    )}
                </div>
                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-6
                    "
                >
                    <button
                        onClick={onClose}
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-white/10
                            hover:bg-red-500/60
                            transition-colors
                            font-semibold
                        "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={saving}
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
                        {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}