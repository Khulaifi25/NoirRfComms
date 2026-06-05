"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
    AnimatePresence,
    motion,
} from "framer-motion";

export default function AddReviewModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);
        
    const [clientName, setClientName] =
    useState("");

    const [rating, setRating] =
        useState(5);

    const [reviewText, setReviewText] =
        useState("");
    
    async function submitReview() {
        try {
            setLoading(true);
            if (!clientName.trim()) {
                alert(
                    "Client name is required."
                );
                return;
            }
            if (!reviewText.trim()) {
                alert(
                    "Review cannot be empty."
                );
                return;
            }
            // cek client ada di orders?
            const keyword =
                `%${clientName.trim()}%`;

            const { data: order } =
                await supabase
                    .from("orders")
                    .select(`
                        id,
                        client_name,
                        contact
                    `)
                    .or(
                        `client_name.ilike.${keyword},contact.ilike.${keyword}`
                    )
                    .limit(1)
                    .single();

            if (!order) {
                alert(
                    "Name not found in client database."
                );
                return;
            }
            const { error } =
                await supabase
                    .from("reviews")
                    .insert({
                        client_name:
                            order.client_name,
                        rating,
                        review_text:
                            reviewText,
                        is_approved:
                            false,
                    });
            if (error) {
                throw error;
            }
            alert(
                "Review submitted. Waiting for approval."
            );
            router.refresh();
            onClose();
        } catch (err) {
            console.error(err);
            alert(
                "Failed to submit review."
            );
        } finally {
            setLoading(false);
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
                    <h3
                        className="
                            text-2xl
                            font-bold
                            mb-6
                            
                        "
                    >
                        Write Review
                    </h3>

                    <div className="space-y-4">
                    <input
                        placeholder="Nama / (@) Username / Kontak"
                        value={clientName}
                        onChange={(e) =>
                            setClientName(
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

                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(
                                Number(
                                    e.target.value
                                )
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
                        <option value={5}>★★★★★</option>
                        <option value={4}>★★★★</option>
                        <option value={3}>★★★</option>
                        <option value={2}>★★</option>
                        <option value={1}>★</option>
                    </select>

                    <textarea
                        rows={5}
                        placeholder="Tulis ulasan anda..."
                        value={reviewText}
                        onChange={(e) =>
                            setReviewText(
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
                                transition
                                font-semibold
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={submitReview}
                            disabled={loading}
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
                            {loading
                                ? "Submitting..."
                                : "Submit Review"}
                        </button>
                    </div>
                </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}