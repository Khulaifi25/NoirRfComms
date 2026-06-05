export const dynamic = "force-dynamic";
export const revalidate = 0;
import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";

import ReviewManagement
from "@/components/admin/ReviewManagement";

const ITEMS_PER_PAGE = 10;

export default async function AdminReviewsPage({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        rating?: string;
    }>;
}) {

    const params =
        await searchParams;

    const rating =
    params.rating ?? "all";

    const page =
        Number(
            params.page ?? "1"
        );

    const from =
        (page - 1)
        * ITEMS_PER_PAGE;

    const to =
        from
        + ITEMS_PER_PAGE
        - 1;

        let query =
        supabase
            .from("reviews")
            .select("*", {
                count: "exact",
            });
    
    if (
        rating !== "all"
    ) {
    
        query =
            query.eq(
                "rating",
                Number(rating)
            );
    }
    
    const {
        data,
        count,
    } =
        await query
            .order(
                "is_approved",
                {
                    ascending: true,
                }
            )
            .order(
                "rating",
                {
                    ascending: false,
                }
            )
            .order(
                "created_at",
                {
                    ascending: false,
                }
            )
            .range(
                from,
                to
            );

    return (
        <AdminGuard>

            <main
                className="
                    max-w-6xl
                    mx-auto
                    px-4
                    py-10
                "
            >

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-2
                    "
                >
                    Reviews Management
                </h1>

                <p
                    className="
                        opacity-70
                        mb-8
                    "
                >
                    Manage client reviews.
                </p>

                <ReviewManagement
                    reviews={data ?? []}
                    total={count ?? 0}
                    currentPage={page}
                    rating={rating}
                />

            </main>

        </AdminGuard>
    );
}