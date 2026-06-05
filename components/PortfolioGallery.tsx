"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    created_at: string;
    is_featured: boolean;
}
    interface PortfolioGalleryProps {
        items: PortfolioItem[];
        total: number;
        currentPage: number;
        category: string;
    }

const ITEMS_PER_PAGE = 10;
export default function PortfolioGallery({
    items,
    total,
    currentPage,
    category,
    }: PortfolioGalleryProps) {
        const router = useRouter();

        const categories = [
            "All",
            "Bust Up",
            "Half Body",
            "Knee Up",
            "Full Body",
            "Chibi",
        ];

        const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
        return (
            <>
              {/* CATEGORY FILTER */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() =>
                        router.push(
                            `/portfolio?category=${cat}&page=1`
                        )
                        }
                        className={`
                        px-4 py-2 rounded-full
                        transition-all duration-300
            
                        ${
                            category === cat
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20"
                        }
                        `}
                    >
                        {cat}
                    </button>
                    ))}
                </div>
            
                {/* GALLERY */}
                <PhotoProvider>
                    <div
                    className="
                        grid
                        grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-5
                    "
                    >
                    {items.map((item) => (
                        <PhotoView
                        key={item.id}
                        src={item.image_url}
                        >
                        <div
                            className="
                            relative
                            cursor-pointer
                            overflow-hidden
                            rounded-2xl
                            bg-white/10
                            backdrop-blur-xl
                            border
                            border-white/10
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            "
                        >
                    {item.is_featured && (
                        <div
                            className="
                                absolute
                                top-3
                                right-3
                                z-10
                                px-3
                                py-1
                                rounded-full
                                border
                                border-yellow-400/20
                                bg-yellow-500/20
                                text-yellow-400
                                text-xs
                                font-semibold
                                backdrop-blur-lg
                            "
                        >
                            ⭐ Featured
                        </div>
                    )}

                            <Image
                            src={item.image_url}
                            alt={item.title}
                            width={600}
                            height={800}
                            className="
                                w-full
                                h-64
                                object-cover
                                transition-transform
                                duration-300
                                hover:scale-105
                            "
                            />
            
                            <div className="p-4">
                            <h3 className="font-bold">
                                {item.title}
                            </h3>
            
                            <p className="text-sm opacity-70">
                                {item.category}
                            </p>
                            
                            </div>
                        </div>
                        </PhotoView>
                    ))}
                    </div>
                </PhotoProvider>
            
                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                        router.push(
                            `/portfolio?category=${category}&page=${currentPage - 1}`
                        )
                        }
                        className="
                        px-4 py-2 rounded-xl
                        bg-white/10
                        disabled:opacity-40
                        "
                    >
                        Prev
                    </button>
            
                    {Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                    ).map((page) => (
                        <button
                        key={page}
                        onClick={() =>
                            router.push(
                            `/portfolio?category=${category}&page=${page}`
                            )
                        }
                        className={`
                            px-4 py-2 rounded-xl
                            transition-all
            
                            ${
                            currentPage === page
                                ? "bg-emerald-500 text-white"
                                : "bg-white/10"
                            }
                        `}
                        >
                        {page}
                        </button>
                    ))}
            
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                        router.push(
                            `/portfolio?category=${category}&page=${currentPage + 1}`
                        )
                        }
                        className="
                        px-4 py-2 rounded-xl
                        bg-white/10
                        disabled:opacity-40
                        "
                    >
                        Next
                    </button>
                    </div>
                )}
            </>
    );
}