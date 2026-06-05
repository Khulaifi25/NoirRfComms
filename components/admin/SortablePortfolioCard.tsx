"use client";

import Image from "next/image";
import {
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
    IconGripVertical,
    IconPencil,
    IconTrash,
} from "@tabler/icons-react";

type PortfolioItem = {
    id: number;
    title: string;
    category: string;
    image_url: string;
    is_featured: boolean;
};

export default function SortablePortfolioCard({
    item,
    onEdit,
    onDelete,
}: {
    item: PortfolioItem;
    onEdit: () => void;
    onDelete: () => void;
}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
    });

    const style = {
        transform:
            CSS.Transform.toString(
                transform
            ),
        transition:
            transition ??
            "transform 150ms ease",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                overflow-hidden
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10      
                ${
                    isDragging
                        ? "opacity-60 scale-105"
                        : ""
                }
            `}
        >

            <div
                className="
                    flex
                    justify-between
                    items-center
                    p-3
                    border-b
                    border-white/10
                "
            >

                <button
                    {...attributes}
                    {...listeners}
                    className="
                        p-2
                        rounded-lg
                        hover:bg-white/10
                    "
                >
                    <IconGripVertical
                        size={18}
                    />
                </button>

                <div className="flex gap-2">

                    <button
                        onClick={onEdit}
                        className="
                            p-2
                            rounded-xl
                            bg-blue-500/20
                        "
                    >
                        <IconPencil
                            size={18}
                        />
                    </button>

                    <button
                        onClick={onDelete}
                        className="
                            p-2
                            rounded-xl
                            bg-red-500/20
                        "
                    >
                        <IconTrash
                            size={18}
                        />
                    </button>

                </div>

            </div>

            <Image
                src={item.image_url}
                alt={item.title}
                width={600}
                height={800}
                className="
                    w-full
                    h-64
                    object-cover
                "
            />

            <div className="p-4">

                <h3 className="font-bold">
                    {item.title}
                </h3>

                <p className="text-sm opacity-70">
                    {item.category}
                </p>

                {item.is_featured && (
                    <div
                        className="
                            mt-3
                            inline-block
                            px-2
                            py-1
                            rounded-full
                            bg-yellow-500/20
                            text-yellow-400
                            text-xs
                        "
                    >
                        ⭐ Featured
                    </div>
                )}

            </div>

        </div>
    );
}