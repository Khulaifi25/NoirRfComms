export const dynamic = "force-dynamic";
export const revalidate = 0;
import AdminGuard from "@/components/AdminGuard";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Props {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function OrdersPage({
    searchParams,
}: Props) {

    const params = await searchParams;

    const page =
        Number(params.page ?? 1);

    const limit = 10;

    const from =
        (page - 1) * limit;

    const to =
        from + limit - 1;

    const {
        data: orders,
        count,
    } =
        await supabase
        .from("orders")
        .select(
            `
            *,
            commission_types (
                name
            )
            `,
            {
                count: "exact",
            }
        )
        .order("created_at", {
            ascending: false,
        })
        .range(from, to);

        const totalPages =
        Math.ceil(
            (count ?? 0) / limit
        );

    function getStatusColor(status: string) {
                switch (status) {
                case "Pending":
                    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            
                case "Accepted":
                    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            
                case "In Progress":
                    return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            
                case "Completed":
                    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            
                case "Rejected":
                    return "bg-red-500/20 text-red-400 border-red-500/30";
            
                default:
                    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
                }
        }

    return (
        <AdminGuard>

        <main className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">

            <h1 className="text-4xl font-bold mb-8">
            Orders
            </h1>

            <div
            className="
                overflow-x-auto
                rounded-3xl
                border
                border-white/10
                bg-white/15
                backdrop-blur-xl
            "
            >
            <table className="w-full">

                <thead>
                <tr className="border-b border-white/10">

                    <th className="p-4 text-left">
                    No
                    </th>

                    <th className="p-4 text-left">
                    Client
                    </th>

                    <th className="p-4 text-left">
                    Commission
                    </th>

                    <th className="p-4 text-left">
                    Total
                    </th>

                    <th className="p-4 text-left">
                    Status
                    </th>

                    <th className="p-2 text-left">
                        Action
                    </th>

                </tr>
                </thead>

                <tbody>

                {orders?.map((order, index) => (
                    
                    <tr
                    key={order.id}
                    className="
                        border-b
                        border-white/5
                    "
                    >
                    <td className="p-4">
                    {from + index + 1}
                    </td>

                    <td className="p-4">
                        {order.client_name}
                    </td>

                    <td className="p-4">
                        {order.commission_types?.name}
                    </td>

                    <td className="p-4">
                        Rp{" "}
                        {order.total_price?.toLocaleString(
                        "id-ID"
                        )}
                    </td>

                    <td className="p-4">
                        <span
                            className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            border
                            ${getStatusColor(order.status)}
                            `}
                        >
                            {order.status}
                        </span>
                    </td>
                    <td className="p-4">
                    <Link
                        href={`/admin/orders/${order.id}`}
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-gray-900/30 
                        text-gray-900
                        border-gray-500/30
                        font-semibold
                        hover:bg-emerald-300/60
                        transition
                        "
                    >
                        Detail
                    </Link>
                    </td>

                    </tr>
                ))}

                </tbody>

            </table>
            </div>

            <div
            className="
                flex
                items-center
                justify-center
                gap-4
                mt-6
            "
            >
                <Link
                href={`/admin/orders?page=${page - 1}`}
                className={`
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/20

                    ${
                    page <= 1
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-white/20"
                    }
                `}
                >
                Prev
                </Link>

                <div
                className="
                    px-4
                    py-2
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                "
                >
                Page {page} of {totalPages}
                </div>

                <Link
                href={`/admin/orders?page=${page + 1}`}
                className={`
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/20

                    ${
                    page >= totalPages
                        ? "pointer-events-none opacity-40"
                        : "hover:bg-white/20"
                    }
                `}
                >
                Next
                </Link>
            </div>

        </main>

        </AdminGuard>
    );
}