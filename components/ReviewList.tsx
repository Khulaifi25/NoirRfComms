"use client";

import { useEffect, useState } from "react";
import AddReviewModal from "@/components/AddReviewModal";
import { IconPlus } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

type Review = {
    id: number;
    client_name: string;
    rating: number;
    review_text: string;
};

export default function ReviewList({
    reviews,
}: {
    reviews: Review[];
}) {
    const [showModal, setShowModal] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

    function shuffleReviews(list: Review[]) {
        return [...list].sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        setVisibleReviews(shuffleReviews(reviews).slice(0, 8));
    }, [reviews]);

    useEffect(() => {
        if (reviews.length <= 8) return;

        const interval = setInterval(() => {
            setVisibleReviews((current) => {
                const next = [...current];

                const replaceIndex = Math.floor(
                    Math.random() * next.length
                );

                const available = reviews.filter(
                    (review) =>
                        !next.some(
                            (r) => r.id === review.id
                        )
                );

                if (available.length === 0)
                    return current;

                const randomReview =
                    available[
                        Math.floor(
                            Math.random() *
                                available.length
                        )
                    ];

                next[replaceIndex] = randomReview;

                return next;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [reviews]);

    return (
        <div className="space-y-5">
            <div className="flex justify-end mb-6">
                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="
                        px-5
                        py-3
                        rounded-full
                        bg-emerald-500
                        text-black
                        font-semibold
                        flex
                        items-center
                        gap-2
                        hover:bg-emerald-400
                        transition
                    "
                >
                    <IconPlus size={18} />
                    Add Review
                </button>
            </div>

            {reviews.length === 0 && (
                <div className="text-center opacity-60 py-20">
                    No reviews yet.
                </div>
            )}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                    items-start
                "
            >
                {visibleReviews.map((review) => (
                    <AnimatePresence
                        mode="wait"
                        key={review.id}
                    >
                        <motion.div
                            key={review.id}
                            layout
                            initial={{
                                opacity: 0,
                                y: 40,
                                scale: 0.9,
                                filter: "blur(8px)",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                            }}
                            exit={{
                                opacity: 0,
                                y: -30,
                                scale: 0.9,
                                filter: "blur(8px)",
                            }}
                            transition={{
                                duration: 0.55,
                                ease: "easeInOut",
                            }}
                            whileHover={{
                                y: -8,
                                scale: 1.03,
                                boxShadow:
                                    "0 0 35px rgba(16,185,129,.35)",
                            }}
                            className="
                                rounded-3xl
                                bg-white/10
                                backdrop-blur-xl
                                border
                                border-white/10
                                p-6
                            "
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-emerald-500
                                        flex
                                        items-center
                                        justify-center
                                        font-bold
                                        text-black
                                    "
                                >
                                    {review.client_name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div>
                                    <div className="font-semibold">
                                        {review.client_name}
                                    </div>

                                    <div className="text-yellow-400 text-sm">
                                        {"★".repeat(
                                            review.rating
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="opacity-80 leading-relaxed">
                                {review.review_text}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>

            {showModal && (
                <AddReviewModal
                    onClose={() =>
                        setShowModal(false)
                    }
                />
            )}
        </div>
    );
}