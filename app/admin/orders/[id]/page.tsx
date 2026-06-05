import OrderStatusForm from "@/components/admin/OrderStatusForm";
import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderDetailPage({
    params,
}: Props) {

    const { id } = await params;

    const { data: order } =
    await supabase
        .from("orders")
        .select(`
        *,
        commission_types (
            name,
            base_price
        )
        `)
        .eq("id", id)
        .single();

    const { data: addons } =
    await supabase
        .from("commission_addons")
        .select("*");

    if (!order) {
        return (
        <AdminGuard>
            <div className="p-10">
            Order tidak ditemukan.
            </div>
        </AdminGuard>
        );
    }

    const selectedAddons =
    addons?.filter((addon) =>
        order.addon_ids?.includes(addon.id)
    ) ?? [];

    const selectedBackground =
    addons?.find(
        (addon) =>
        addon.id === order.background_addon_id
    );

    return (
        <AdminGuard>
        <main className="max-w-5xl mx-auto px-4 py-10">
            
            <a
            href="/admin/orders"
            className="
                inline-flex
                items-center
                gap-2
                mb-6
                px-4
                py-2
                rounded-xl
                bg-white/10
                hover:bg-white/20
                border
                border-white/10
                transition
            "
            >
            ← Back
            </a>

            <h1 className="text-4xl font-bold mb-8">
            Order #{order.id}
            </h1>

            <div
            className="
                rounded-3xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                p-8
                space-y-4
            "
            >

            <div>
                <strong>Client:</strong>{" "}
                {order.client_name}
            </div>

            <div>
                <strong>Contact:</strong>{" "}
                {order.contact}
            </div>

            <div>
                <strong>Email:</strong>{" "}
                {order.email}
            </div>

            <div>
                <strong>Commission:</strong>{" "}
                {order.commission_types?.name}
            </div>

            <div>
                <strong>Extra Character:</strong>{" "}
                {order.extra_character_count}
            </div>

            <div>
                <strong>Background:</strong>{" "}
                {selectedBackground?.name ?? "-"}
            </div>

            <div>
                <strong>Add-ons:</strong>

                {selectedAddons.length > 0 ? (
                    <ul className="list-disc ml-6 mt-2">
                    {selectedAddons.map((addon) => (
                        <li key={addon.id}>
                        {addon.name}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <span className="ml-2">
                    Tidak ada
                    </span>
                )}
            </div>  

            <div>
                <strong>Total:</strong>{" "}
                Rp {order.total_price?.toLocaleString("id-ID")}
            </div>
            <div>
                <strong>Reference:</strong>{" "}
                <a
                href={order.reference_link}
                target="_blank"
                className="text-emerald-400"
                >
                Open Link
                </a>
            </div>
            <div>
            <strong>Status:</strong>{" "}

            <span
                className={`
                px-3
                py-1
                rounded-full
                text-sm
                ml-2
                ${
                    order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : order.status === "Accepted"
                    ? "bg-blue-500/20 text-blue-400"
                    : order.status === "In Progress"
                    ? "bg-purple-500/20 text-purple-400"
                    : order.status === "Completed"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }
                `}
            >
                {order.status}
            </span>
            </div>

            <OrderStatusForm
            orderId={order.id}
            currentStatus={order.status}
            commissionTypeId={order.commission_type_id}
            />

            <div>
                <div
                className="
                    mt-6
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                "
                >
                <strong>Description:</strong>
                <div className="mt-2 whitespace-pre-wrap">
                {order.description}
            </div>
            </div>
        </div>

        </div>

        </main>
        </AdminGuard>
    );
}