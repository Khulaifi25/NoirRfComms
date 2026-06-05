import { supabase } from "@/lib/supabase";
import QueueBoard from "@/components/QueueBoard";

export default async function QueuePage() {

    const { data } =
        await supabase
            .from("orders")
            .select(`
                id,
                client_name,
                status,
                created_at,
                commission_types (
                    name
                )
            `)
            .neq(
                "status",
                "Rejected"
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
                max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10
            "
        >
            <div className="mb-8">

                <h1
                    className="
                        text-4xl
                        font-bold
                    "
                >
                    Commission Queue
                </h1>

                <p
                    className="
                        opacity-70
                        mt-2
                    "
                >
                    Current commission progress and waiting list.
                </p>

            </div>

            <QueueBoard
                orders={data ?? []}
            />

        </main>
    );
}