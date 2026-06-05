"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Review = {
    id: number;
    client_name: string;
    rating: number;
    review_text: string;
    is_approved: boolean;
};

const ITEMS_PER_PAGE = 10;

export default function ReviewManagement({
    reviews,
    total,
    currentPage,
    rating,
}: {
    reviews: Review[];
    total: number;
    currentPage: number;
    rating: string;
}) {

    const router = useRouter();
    const totalPages =
    Math.ceil(
        total /
        ITEMS_PER_PAGE
    );

    async function approveReview(
        id: number
    ) {

        const { error } =
            await supabase
                .from("reviews")
                .update({
                    is_approved:
                        true,
                })
                .eq(
                    "id",
                    id
                );

        if (!error) {

            alert(
                "Review approved."
            );

            router.refresh();
        }
    }

    async function deleteReview(
        id: number
    ) {

        const confirmed =
            confirm(
                "Delete review?"
            );

        if (!confirmed) {
            return;
        }

        const { error } =
            await supabase
                .from("reviews")
                .delete()
                .eq(
                    "id",
                    id
                );

        if (!error) {

            alert(
                "Review deleted."
            );

            router.refresh();
        }
    }

    async function unapproveReview(
        id: number
    ) {
    
        const { error } =
            await supabase
                .from("reviews")
                .update({
                    is_approved: false,
                })
                .eq(
                    "id",
                    id
                );
    
        if (!error) {
    
            alert(
                "Review moved back to pending."
            );
    
            router.refresh();
        }
    }

    const pendingCount =
    reviews.filter(
        (review) =>
            !review.is_approved
    ).length;

    const approvedCount =
        reviews.filter(
            (review) =>
                review.is_approved
        ).length;

return (
        
        <div
            className="
                space-y-5
            "
        >
            <div
            className="
                flex
                gap-3
                mb-8
                flex-wrap
            "
            >

                <div
                    className="
                        px-4
                        py-2
                        rounded-full
                        bg-yellow-500/20
                        text-yellow-400
                        backdrop-blur-lg
                        text-sm
                    "
                >
                    Pending: {pendingCount}
                </div>

                <div
                    className="
                        px-4
                        py-2
                        rounded-full
                        bg-emerald-500/20
                        text-emerald-400
                        backdrop-blur-lg
                        text-sm
                    "
                >
                    Approved: {approvedCount}
                </div>

                <div
                    className="
                        px-4
                        py-2
                        rounded-full
                        bg-blue-500/20
                        text-blue-400
                        backdrop-blur-lg
                        text-sm
                    "
                >
                    Total: {reviews.length}
                </div>
            </div>
            <div className="mb-6">
            <select
                value={rating}
                onChange={(e) =>
                    router.push(
                        `/admin/reviews?rating=${e.target.value}&page=1`
                    )
                }
                className="
                    px-4
                    py-2
                    rounded-xl
                    bg-white/10
                    border
                    border-white/10
                "
            >
                <option value="all">
                    All Ratings
                </option>
                <option value="5">
                    ★★★★★
                </option>
                <option value="4">
                    ★★★★☆
                </option>
                <option value="3">
                    ★★★☆☆
                </option>
                <option value="2">
                    ★★☆☆☆
                </option>
                <option value="1">
                    ★☆☆☆☆
                </option>
            </select>
        </div>
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                "
            >
                {reviews.map(
                    (review) => (

                    <div
                        key={review.id}
                        className="
                            rounded-3xl
                            bg-white/5
                            border
                            border-white/10
                            backdrop-blur-xl
                            p-6
                        "
                    >
                        <div
                            className="
                                flex
                                justify-between
                                items-start
                                gap-4
                            "
                        >
                            <div>
                                <div
                                    className="
                                        font-bold
                                        text-lg
                                    "
                                >
                                    { review.client_name}
                                </div>
                                <div
                                    className="
                                        text-yellow-400
                                        mb-3
                                    "
                                >
                                    {"★".repeat(
                                        review.rating
                                    )}
                                </div>
                                <p
                                    className="
                                        opacity-80
                                    "
                                >
                                    {
                                        review.review_text
                                    }
                                </p>
                            </div>
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >
                            {review.is_approved ? (
                                <button
                                    onClick={() =>
                                        unapproveReview(
                                            review.id
                                        )
                                    }
                                    className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-gray-900/40
                                        backdrop-blur-lg
                                        hover:backdrop-blur-lg
                                        text-gray-400
                                        hover:bg-gray-500/70
                                        hover:text-black
                                        font-bold
                                        transition
                                    "
                                >
                                    Unapprove
                                </button>
                                ) : (
                                <button
                                    onClick={() =>
                                        approveReview(
                                            review.id
                                        )
                                    }
                                    className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-emerald-500/20
                                        text-emerald-400
                                        hover:bg-emerald-500/70
                                        hover:text-white
                                        backdrop-blur-lg
                                        hover:backdrop-blur-lg
                                        font-bold
                                        transition
                                    "
                                >
                                    Approve
                                </button>
                                )}

                                <button
                                    onClick={() =>
                                        deleteReview(
                                            review.id
                                        )
                                    }
                                    className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-red-500/20
                                        text-red-400
                                        hover:bg-red-500/70
                                        hover:text-white
                                        backdrop-blur-lg
                                        hover:backdrop-blur-lg
                                        font-bold
                                        transition
                                    "
                                >Delete
                                </button>
                            </div>
                        </div>
                        <div
                            className="
                                mt-4
                            "
                        >
                            {review.is_approved ? (
                                <span
                                    className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-emerald-500/20
                                        text-emerald-400
                                        text-sm
                                    "
                                >
                                    Approved
                                </span>
                            ) : (
                                <span
                                    className="
                                        px-3
                                        py-1
                                        rounded-full
                                        bg-yellow-500/20
                                        text-yellow-400
                                        text-sm
                                    "
                                >
                                    Pending
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
            <div
                className="
                    flex
                    justify-center
                    gap-2
                    mt-10
                    flex-wrap
                "
            >
                <button
                    disabled={
                        currentPage === 1
                    }
                    onClick={() =>
                        router.push(
                            `/admin/reviews?page=${
                                currentPage - 1
                            }`
                        )
                    }
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-white/10
                        disabled:opacity-40
                    "
                >
                    Prev
                </button>
                {Array.from(
                    {
                        length:
                            totalPages,
                    },
                    (_, i) => i + 1
                ).map((page) => (
                    <button
                        key={page}
                        onClick={() =>
                            router.push(
                                `/admin/reviews?page=${page}&rating=${rating}`
                            )
                        }
                        className={`
                            px-4
                            py-2
                            rounded-xl
                            transition-all
                            ${
                                currentPage === page
                                ? "bg-emerald-500 text-white"
                                : "bg-white/10"
                            }
                        `}
                    >
                        {page}
                    </button>
                ))}
                <button
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        router.push(
                            `/admin/reviews?page=${
                                currentPage + 1
                            }`
                        )
                    }
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-white/10
                        disabled:opacity-40
                    "
                >
                    Next
                </button>
            </div>
            )}
        </div>
    );
}