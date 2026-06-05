"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleUpload() {
        if (!file) return;

        setLoading(true);

        try {
        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "upload_preset",
            "portfolio_upload"
        );

        const cloudinaryRes = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
            method: "POST",
            body: formData,
            }
        );

        const cloudinaryData =
            await cloudinaryRes.json();

        const imageUrl =
            cloudinaryData.secure_url;

        const { error } = await supabase
            .from("portfolio")
            .insert({
            title,
            description,
            category,
            image_url: imageUrl,
            });

        if (error) throw error;

        alert("Upload berhasil!");

        setTitle("");
        setDescription("");
        setCategory("");
        setFile(null);
        } catch (err) {
        console.error(err);
        alert("Upload gagal");
        }

        setLoading(false);
    }

    return (
        <div className="space-y-4">

        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
            setTitle(e.target.value)
            }
            className="w-full p-3 rounded-xl border"
        />

        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
            setDescription(e.target.value)
            }
            className="w-full p-3 rounded-xl border"
        />

        <select
            value={category}
            onChange={(e) =>
            setCategory(e.target.value)
            }
            className="w-full p-3 rounded-xl border"
        >
            <option value="">
            Select Category
            </option>

            <option value="Illustration">
            Illustration
            </option>

            <option value="Chibi">
            Chibi
            </option>

            <option value="Fanart">
            Fanart
            </option>

            <option value="Emote">
            Emote
            </option>
        </select>

        <input
            type="file"
            accept="image/*"
            onChange={(e) =>
            setFile(
                e.target.files?.[0] ?? null
            )
            }
        />

        <button
            onClick={handleUpload}
            disabled={loading}
            className="
            px-6 py-3
            rounded-xl
            bg-emerald-500
            text-white
            "
        >
            {loading
            ? "Uploading..."
            : "Upload"}
        </button>
        </div>
    );
}