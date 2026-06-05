import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";

import PortfolioManagement
from "@/components/admin/PortfolioManagement";

export default async function AdminPortfolioPage() {

    const { data } =
        await supabase
            .from("portfolio")
            .select("*")
            .order("sort_order")
            .order("id");

    return (
        <AdminGuard>
            <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">

                <h1 className="text-4xl font-bold mb-2">
                    Portfolio Management
                </h1>

                <p className="opacity-70 mb-8">
                    Manage artwork gallery.
                </p>

                <PortfolioManagement
                    items={data ?? []}
                />

            </main>
        </AdminGuard>
    );
}