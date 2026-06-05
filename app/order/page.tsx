export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabase } from "@/lib/supabase";
import OrderForm from "@/components/OrderForm";

export default async function OrderPage({
    searchParams,
    }: {
    searchParams: Promise<{
        commission?: string;
    }>;
    }) {
    const params = await searchParams;

    const selectedCommissionId = 
    params.commission
    ? Number(params.commission)
    : undefined;

    const { data: commissions } =
        await supabase
        .from("commission_types")
        .select("*")
        .eq("is_active", true);

    const { data: addons } =
        await supabase
        .from("commission_addons")
        .select("*")
        .eq("is_active", true);

    return (
        <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">
            Order Commission
        </h1>

        <OrderForm
            commissions={commissions ?? []}
            addons={addons ?? []}
            defaultCommissionId={
            selectedCommissionId
            }
        />
        </main>
    );
}