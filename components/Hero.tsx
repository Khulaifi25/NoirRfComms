import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="text-center mt-16">
        <div className="relative w-fit mx-auto">

        <Image
            src="/avatar.png"
            alt="avatar"
            width={120}
            height={120}
            className="
                rounded-full
                mx-auto
                border
            "
        />

        </div>
        <h1 className="mt-6 text-5xl font-bold">
            NoirRf COMMISSION
        </h1>
        <p className="mt-3 font-bold">
            Illustration Artist - @noirs_rf
        </p>
        <div className="flex justify-center gap-8 mt-15 flex-wrap">
        {/* IDR */}
        <div className="relative border-3  border-t-transparent rounded-full min-w-[280px] py-4 px-10 shadow-lg transform transition duration-500 hover:scale-105">
            <span
            className="
                absolute
                -top-4
                left-1/2
                -translate-x-1/2
                px-4
                text-lg
                font-bold
            "
            >
            IDR
            </span>

            <Link
            href="/commission"
            className="block text-center text-2xl font-bold"
            >
            COMMISSION
            </Link>
        </div>

        {/* Gallery */}
        <div className="relative border-3  border-t-transparent rounded-full min-w-[280px] py-4 px-10 shadow-lg transform transition duration-500 hover:scale-105">
            <span
            className="
                absolute
                -top-4
                left-1/2
                -translate-x-1/2
                px-4
                text-lg
                font-bold
            "
            >
            Gallery
            </span>

            <Link
            href="/portfolio"
            className="block text-center text-2xl font-bold"
            >
            PORTFOLIO
            </Link>
        </div>

        {/* USD */}
        <div className="relative border-3  border-t-transparent rounded-full min-w-[280px] py-4 px-10 shadow-lg transform transition duration-500 hover:scale-105">
            <span
            className="
                absolute
                -top-4
                left-1/2
                -translate-x-1/2
                px-4
                text-lg
                font-bold
            "
            >
            USD
            </span>

            <a
            href="https://vgen.co/noirs_rf"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-2xl font-bold"
            >
            COMMISSION ↗
            </a>
        </div>

        </div>
        </section>
);
}