import {
    IconCircleCheck,
    IconCircleX,
    IconSparkles,
    IconFileText,
  } from "@tabler/icons-react";

export default function CommissionInfo() {
    return (
        <div className="mt-10 space-y-6">
    
            {/* ADDONS */}
            <section
            className="
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                p-6 md:p-8
            "
            >
            <div className="flex items-center gap-3 mb-4">
                <IconSparkles
                size={28}
                stroke={1.8}
                className="text-amber-300"
                />

                <h2 className="text-2xl font-bold">
                Add-ons
                </h2>
            </div>

            <ul className="space-y-3 list-disc pl-5">
                <li>Extra Character (+80%)</li>
                <li>Commercial Use (+100%)</li>
                <li>Monetized Content (+50%)</li>
                <li>NSFW (+Rp50.000)</li>
                <li>Private Commission (+Rp200.000)</li>
            </ul>
            </section>

            {/* DO & DON'T */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* DO */}
            <section
                className="
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                p-6 md:p-8
                "
            >
                <div className="flex items-center gap-3 mb-4">
                <IconCircleCheck
                    size={28}
                    stroke={1.8}
                    className="text-green-400"
                />

                <h2 className="text-2xl font-bold">
                    Do
                </h2>
                </div>

                <ul className="space-y-3 list-disc pl-5">
                <li>Original Characters</li>
                <li>Teen Male (Shota, Shounen, Nekomimi/Kemonomimi, etc.)</li>
                <li>Teen Female (Loli, Shoujo, Nekomimi/Kemonomimi, etc)</li>
                <li>Anime/Manga/Game Characters (Fanart)</li>
                <li>NSFW / SFW</li>
                </ul>
            </section>

            {/* DON'T */}
            <section
                className="
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                p-6 md:p-8
                "
            >
                <div className="flex items-center gap-3 mb-4">
                <IconCircleX
                    size={28}
                    stroke={1.8}
                    className="text-red-400"
                />

                <h2 className="text-2xl font-bold">
                    Don&apos;t
                </h2>
                </div>

                <ul className="space-y-3 list-disc pl-5">
                <li>Mecha (Futuristic, Cyber theme)</li>
                <li>Heavy Gore</li>
                <li>Furry</li>
                <li>Hateful Content</li>
                <li>Heavy Armor</li>
                <li>Old Human (Daddy) and Muscular</li>
                </ul>
            </section>

            </div>

    
            {/* TERMS OF SERVICE */}
            <section
            className="
                rounded-3xl
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                p-6 md:p-8
            "
            >
            <div className="flex items-center gap-3 mb-6">
                <IconFileText
                size={28}
                stroke={1.8}
                className="text-amber-300"
                />

                <h2 className="text-2xl font-bold">
                Terms of Service
                </h2>
            </div>

            <ul className="space-y-4 list-disc pl-5">
                <li>Pembayaran dilakukan setelah sketch disetujui.</li>

                <li>Tidak ada refund setelah pembayaran dilakukan.</li>

                <li>Estimasi pengerjaan 7–30 hari tergantung antrean.</li>

                <li>Termasuk 3 revisi minor dan 1 revisi mayor.</li>

                <li>Penggunaan komersial wajib membeli Commercial Use.</li>

                <li>Saya berhak menolak commission yang tidak sesuai.</li>

                <li>Hasil akhir dikirim dalam format PNG/JPG resolusi tinggi.</li>

                <li>Commercial Use akan mendapatkan file PSD/Clip/IPV.</li>

                <li>Tidak diizinkan untuk digunakan sebagai NFT & AI.</li>

                <li>
                Artwork akan digunakan sebagai portfolio (dengan watermark)
                kecuali membeli Private Commission.
                </li>
            </ul>
            </section>
        </div>
        );
    }