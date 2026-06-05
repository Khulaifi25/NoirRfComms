export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabase } from "@/lib/supabase";
import ReviewList from "@/components/ReviewList";

export default async function ReviewsPage() {

    const { data } =
        await supabase
            .from("reviews")
            .select("*")
            .eq(
                "is_approved",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false,
                }
            );

    return (
        <main
            className="
                max-w-5xl
                mx-auto
                px-4
                py-10
                pb-24
                md:pb-10
            "
        >

            <div className="mb-8">

                <h1
                    className="
                        text-4xl
                        font-bold
                    "
                >
                    Client Reviews
                </h1>

                <p
                    className="
                        opacity-70
                        mt-2
                    "
                >
                    What clients say about my work.
                </p>

            </div>

            <ReviewList
                reviews={data ?? []}
            />

        </main>
    );
}