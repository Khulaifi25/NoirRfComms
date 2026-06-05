import { QueueOrder } from "@/types/queue";

function maskName(
    name: string
) {
    if (name.length <= 3) {
        return name;
    }

    return (
        name.slice(0, 3)
        + "***"
    );
}

function formatDate(
    date: string
) {
    return new Date(
        date
    ).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
}

export default function QueueBoard({
    orders,
}: {
    orders: QueueOrder[];
}) {

    const pending =
        orders.filter(
            (order) =>
                order.status ===
                "Pending"
        );

    const accepted =
        orders.filter(
            (order) =>
                order.status ===
                "Accepted"
        );

    const inProgress =
        orders.filter(
            (order) =>
                order.status ===
                "In Progress"
        );

    const completed =
        orders
            .filter(
                (order) =>
                    order.status ===
                    "Completed"
            )
            .slice(0, 5);

    const columns = [
        {
            title: "NEW",
            color:
                "from-blue-500 to-pink-500",
            items: pending,
        },
        {
            title: "WAITLIST",
            color:
                "from-cyan-500 to-emerald-500",
            items: accepted,
        },
        {
            title: "WIP",
            color:
                "from-orange-400 to-lime-300",
            items: inProgress,
        },
        {
            title: "COMPLETE",
            color:
                "from-green-500 to-emerald-500",
            items: completed,
        },
    ];


    return (
        <div
            className="
                grid
                grid-cols-1
                lg:grid-cols-4
                gap-6
                items-start
            "
        >
            {columns.map(
                (column) => (
                    <div
                        key={column.title}
                    >
                        <div
                            className={`
                                rounded-2xl
                                bg-linear-to-r
                                ${column.color}
                                px-5
                                py-3
                                font-bold
                                text-white
                                mb-3
                            `}
                        >
                            {column.title}
                            {" "}
                            (
                            {
                                column.items
                                    .length
                            }
                            )
                        </div>

                        <div
                            className="
                                rounded-3xl
                                bg-white/10
                                backdrop-blur-xl
                                border
                                border-white/10
                                p-4
                                min-h-70
                                space-y-3
                            "
                        >
                            {column.items
                                .length ===
                                0 ? (
                                <div
                                    className="
                                        rounded-2xl
                                        bg-black/20
                                        border
                                        border-white/10
                                        p-5
                                        text-center
                                        opacity-60
                                    "
                                >
                                    Nothing
                                    in here
                                    yet
                                </div>
                            ) : (
                                column.items.map(
                                    (order) => (
                                        <div
                                            key={order.id}
                                            className="
                                                rounded-2xl
                                                bg-black/20
                                                border
                                                border-white/10
                                                p-4
                                                transition-all
                                                duration-300
                                                hover:-translate-y-1
                                                hover:border-emerald-400/30
                                            "
                                        >
                                            <div
                                                className="
                                                    font-semibold
                                                "
                                            >
                                                {
                                                    maskName(
                                                        order.client_name
                                                    )
                                                }
                                            </div>

                                            <div
                                                className="
                                                    text-sm
                                                    text-emerald-400
                                                    mt-1
                                                "
                                            >
                                                {
                                                    order
                                                        .commission_types
                                                        ?.name ??
                                                    "-"
                                                }
                                            </div>

                                            <div
                                                className="
                                                    text-xs
                                                    opacity-60
                                                    mt-2
                                                "
                                            >
                                                {
                                                    formatDate(
                                                        order.created_at
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}