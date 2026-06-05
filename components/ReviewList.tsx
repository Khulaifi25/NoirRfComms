"use client";

import { useState } from "react";
import AddReviewModal from "@/components/AddReviewModal";
import { IconPlus } from "@tabler/icons-react";

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
    const [showModal, setShowModal] =
    useState(false);

    return (
        

        <div
            className="
                space-y-5
            "
        >
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

                <div
                    className="
                        text-center
                        opacity-60
                        py-20
                    "
                >
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
            "
            >
            {reviews.map((review) => (

                <div
                    key={review.id}
                    className="
                        rounded-3xl
                        bg-white/10
                        backdrop-blur-xl
                        border
                        border-white/10
                        p-6
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-3
                        "
                    >

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

                            <div
                                className="
                                    font-semibold
                                "
                            >
                                {review.client_name}
                            </div>

                            <div
                                className="
                                    text-yellow-400
                                    text-sm
                                "
                            >
                                {"★".repeat(
                                    review.rating
                                )}
                            </div>

                        </div>

                    </div>

                    <p
                        className="
                            opacity-80
                            leading-relaxed
                        "
                    >
                        {review.review_text}
                    </p>

                </div>

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