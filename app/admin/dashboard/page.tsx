import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";
import SettingComms from "@/components/admin/SettingComms";
import {
    IconShoppingCart,
    IconClock,
    IconCircleCheck,
    IconCash,
} from "@tabler/icons-react";

    function StatCard({
    title,
    value,
    icon,
    }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    }) {
    return (
        <div
        className="
            rounded-3xl
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            p-6
        "
        >
        <div className="flex items-center justify-between mb-4">
            <p className="opacity-70">{title}</p>

            <div className="text-emerald-400">
            {icon}
            </div>
        </div>

        <h2 className="text-4xl font-bold">
            {value}
        </h2>
        </div>
    );
    }

    export default async function DashboardPage() {
    const { data: orders } = await supabase
        .from("orders")
        .select("*");

    const totalOrders =
        orders?.length ?? 0;

    const pendingOrders =
        orders?.filter(
        (o) => o.status === "Pending"
        ).length ?? 0;

    const completedOrders =
        orders?.filter(
        (o) => o.status === "Completed"
        ).length ?? 0;

    const revenue =
        orders
        ?.filter(
            (o) => o.status === "Completed"
        )
        .reduce(
            (sum, order) =>
            sum + (order.total_price ?? 0),
            0
        ) ?? 0;

    const acceptedOrders =
        orders?.filter(
        (o) =>
            o.status === "Accepted" ||
            o.status === "In Progress"
        ).length ?? 0;

    const { data: settings } =
        await supabase
            .from("settings")
            .select("*")
            .single();

    return (
        <AdminGuard>
        <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">
            <h1 className="text-4xl font-bold mb-2">
            Dashboard
            </h1>

            <p className="opacity-70 mb-8">
            Ringkasan statistik commission.
            </p>

            {/* STATS */}

            <div className="grid md:grid-cols-4 gap-6">
                

            <StatCard
                title="Total Orders"
                value={totalOrders}
                icon={<IconShoppingCart size={28} />}
            />

            <StatCard
                title="Pending"
                value={pendingOrders}
                icon={<IconClock size={28} />}
            />

            <StatCard
                title="Active Orders"
                value={acceptedOrders}
                icon={<IconCircleCheck size={28} />}
            />

            <StatCard
                title="Revenue"
                value={`Rp ${revenue.toLocaleString("id-ID")}`}
                icon={<IconCash size={28} />}
            />

            </div>

            <div className="mt-10">
            <SettingComms
                settings={settings}
            />
            </div>

            {/* RECENT ORDERS */}

            <div
            className="
                mt-10
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                overflow-hidden
            "
            >
            <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">
                Recent Orders
                </h2>
            </div>

            <table className="w-full">
                <thead>
                <tr className="border-b border-white/10">
                    <th className="text-left p-4">
                    Client
                    </th>

                    <th className="text-left p-4">
                    Total
                    </th>

                    <th className="text-left p-4">
                    Status
                    </th>
                </tr>
                </thead>

                <tbody>
                {orders
                    ?.slice()
                    .reverse()
                    .slice(0, 5)
                    .map((order) => (
                    <tr
                        key={order.id}
                        className="
                        border-b
                        border-white/5
                        "
                    >
                        <td className="p-4">
                        {order.client_name}
                        </td>

                        <td className="p-4">
                        Rp{" "}
                        {order.total_price?.toLocaleString(
                            "id-ID"
                        )}
                        </td>

                        <td className="p-4">
                        {order.status}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </main>
        </AdminGuard>
    );
}