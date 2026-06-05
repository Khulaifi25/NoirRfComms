export async function POST(
    request: Request
) {
    try {

        const body =
            await request.json();

        await fetch(
            process.env
                .DISCORD_WEBHOOK_URL!,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    embeds: [
                        {
                            title:
                                "🎨 New Commission Order",

                            color: 5763719,

                            fields: [
                                {
                                    name:
                                        "Client",
                                    value:
                                        body.client_name,
                                    inline: true,
                                },
                                {
                                    name:
                                        "Contact",
                                    value:
                                        body.contact,
                                    inline: true,
                                },
                                {
                                    name:
                                        "Email",
                                    value:
                                        body.email,
                                },
                                {
                                    name:
                                        "Commission",
                                    value:
                                        body.commission_type,
                                },
                                {
                                    name:
                                        "Price",
                                    value:
                                        body.total_price,
                                },
                            ],

                            description:
                                body.reference_link
                                    ? `Reference:\n${body.reference_link}`
                                    : "No Reference",
                        },
                    ],
                }),
            }
        );

        return Response.json({
            success: true,
        });

    } catch {

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}