import { supabase } from "@/lib/supabase";
import PortfolioGallery from "@/components/PortfolioGallery";

const ITEMS_PER_PAGE = 10;

export default async function PortfolioPage({
    searchParams,
    }: {
    searchParams: Promise<{
        category?: string;
        page?: string;
    }>;
    }) {
    const params = await searchParams;

    const category = params.category ?? "All";
    const page = Number(params.page ?? "1");

    let query = supabase
        .from("portfolio")
        .select("*", { count: "exact" });

    if (category !== "All") {
        query = query.eq("category", category);
    }

    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, count } = await query
    .range(from, to)
    .order("is_featured", {
        ascending: false,
    })
    .order("sort_order", {
        ascending: true,
    });

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">
        <div className="mb-8">
            <h1 className="text-4xl font-bold">
            Gallery Art
            </h1>

            <p className="opacity-70 mt-2">
            Browse all artworks and commissions.
            </p>
        </div>

        <PortfolioGallery
            items={data || []}
            total={count || 0}
            currentPage={page}
            category={category}
        />
        </main>
    );
}