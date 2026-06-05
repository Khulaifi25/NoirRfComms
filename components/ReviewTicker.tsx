export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabase } from "@/lib/supabase";

export default async function ReviewTicker() {

    const { data } =
        await supabase
            .from("reviews")
            .select(`
                client_name,
                review_text,
                rating
            `)
            .eq(
                "is_approved",
                true
            );

    const randomReviews =
        [...(data ?? [])]
            .sort(
                () => Math.random() - 0.5
            )
            .slice(0, 5);

    const tickerItems =
        randomReviews.map(
            (review) =>
                `${"⭐".repeat(review.rating)} ${review.review_text} - ${review.client_name}`
        );


    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">

            <div
                className="
                    overflow-hidden
                    rounded-full
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/10
                "
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                    maskImage:
                        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <div
                    className="
                        review-scroll
                        whitespace-nowrap
                        py-3
                        animate-[reviewTicker_25s_linear_infinite]
                    "
                >
                    {tickerItems.map(
                        (item, index) => (
                            <span
                                key={index}
                                className="
                                    inline-block
                                    mr-15
                                "
                            >
                                {item}
                            </span>
                        )
                    )}
                </div>
            </div>

        </div>
    );
}