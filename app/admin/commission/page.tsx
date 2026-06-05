import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";
import CommissionTable from "@/components/admin/CommissionTable";
import AddCommissionForm from "@/components/admin/AddCommissionForm";
import AddonsManagement from "@/components/admin/AddonsManagement";

export default async function AdminCommissionPage() {
    const { data: commissions } =
        await supabase
        .from("commission_types")
        .select("*")
        .order("id");

    const { data: addons } =
        await supabase
        .from("commission_addons")
        .select("*")
        .order("category")
        .order("sort_order")
        .order("id");


    return (
        <AdminGuard>
        <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">

            <h1 className="text-4xl font-bold mb-2">
            Commission Management
            </h1>

            <p className="opacity-70 mb-8">
            Kelola harga, slot, dan status commission.
            </p>

            <AddCommissionForm />
            <CommissionTable
            commissions={commissions ?? []}
            />
            <AddonsManagement
                addons={addons ?? []}
            />

        </main>
        </AdminGuard>
    );
}