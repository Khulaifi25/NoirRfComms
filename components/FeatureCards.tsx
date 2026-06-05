import Image from "next/image";

export default function FeatureCards() {
    const features = [
        {
        title: "Time",
        image: "/av1.webp",
        txt: "7-30 days",
        },
        {
        title: "Revision",
        image: "/av4.webp",
        txt: "3 Minor & 1 Major",
        },
        {
        title: "Term of Service",
        image: "/av3.webp",
        txt: (
            <a
                href="/commission"
                className="hover:text-blue-500 transition-colors duration-300"
            >
                Read More
            </a>
        ),
        },
        {
        title: "Payment",
        image: "/av2.webp",
        txt: "BNI 46, DANA, Paypal, VGen Payment (Stripe)",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto mt-12 px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {features.map((item) => (
            <div
            key={item.title}
            className="
                flex flex-col items-center
                transition-all duration-300
                hover:-translate-y-2
            "
            >
                
            <h3 className="mb-2 md:mb-4 text-lg md:text-xl font-bold text-center">
                {item.title}
            </h3>
            <div
                className="
                w-full
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                p-3 md:p-4
                "
            >
                <Image
                src={item.image}
                alt={item.title}
                width={220}
                height={220}
                className="
                    w-full
                    h-auto
                    max-w-[140px]
                    md:max-w-[220px]
                    mx-auto
                    object-contain
                    drop-shadow-xl
                    transition-transform
                    duration-300
                    hover:scale-105
                "
                />
                <h3 className="mt-3 text-sm md:text-lg font-medium text-center leading-relaxed">
                {item.txt}
            </h3>
            </div>
            </div>
        ))}
        </div>
    );
}