"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AddPortfolioForm from "@/components/admin/AddPortfolioForm";
import EditPortfolioModal from "@/components/admin/EditPortfolioModal";
import {
    DndContext,
    closestCenter,
    DragEndEvent,
} from "@dnd-kit/core";

import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

import SortablePortfolioCard from "@/components/admin/SortablePortfolioCard";
import { useEffect, } from "react";

// import EditPortfolioModal
//     from "./EditPortfolioModal";

type PortfolioItem = {
    id: number;
    title: string;
    description: string;
    category: string;
    image_url: string;
    public_id:string;
    sort_order: number;
    is_featured: boolean;
};

export default function PortfolioManagement({
    items,
}: {
    items: PortfolioItem[];
}) {
    const router = useRouter();

    const [portfolioItems, setPortfolioItems] =
    useState(items);

    const [selectedItem, setSelectedItem] =
        useState<PortfolioItem | null>(
            null
        );

    async function handleDragEnd(
        event: DragEndEvent
    ) {

        const {
            active,
            over,
        } = event;

        if (
            !over ||
            active.id === over.id
        ) {
            return;
        }

        const oldIndex =
            portfolioItems.findIndex(
                (item) =>
                    item.id === active.id
            );

        const newIndex =
            portfolioItems.findIndex(
                (item) =>
                    item.id === over.id
            );

        const reordered =
            arrayMove(
                portfolioItems,
                oldIndex,
                newIndex
            );

        setPortfolioItems(
            reordered
        );

        try {

            for (
                let i = 0;
                i < reordered.length;
                i++
            ) {

                await supabase
                    .from("portfolio")
                    .update({
                        sort_order:
                            i + 1,
                    })
                    .eq(
                        "id",
                        reordered[i].id
                    );
            }

        } catch (err) {

            console.error(err);

            alert(
                "Failed to save order."
            );
        }
    }
    async function deleteArtwork(
        item: PortfolioItem
    ) {

        const confirmed =
            confirm(
                `Delete "${item.title}" ?`
            );

        if (!confirmed) return;

        try {

            await fetch(
                "/api/cloudinary/delete",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        public_id:
                            item.public_id,
                    }),
                }
            );

            const { error } =
                await supabase
                    .from("portfolio")
                    .delete()
                    .eq(
                        "id",
                        item.id
                    );

            if (error) {
                throw error;
            }

            alert(
                "Artwork deleted."
            );

            setPortfolioItems((prev) =>
                prev.filter(
                    (x) => x.id !== item.id
                )
            );

            router.refresh();

        } catch (err) {

            console.error(err);

            alert(
                "Delete failed."
            );
        }
    }
return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                    Portfolio Gallery
                </h2>
                <AddPortfolioForm
                    items={items}
                />
            </div>

            
            <DndContext
                collisionDetection={
                    closestCenter
                }
                onDragEnd={
                    handleDragEnd
                }
            >

            <SortableContext
                items={portfolioItems.map(
                    (item) => item.id
                )}
                strategy={
                    rectSortingStrategy
                }
            >

            <div
                className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-5
                "
            >

                {portfolioItems.map(
                    (item) => (

                    <SortablePortfolioCard
                        key={item.id}
                        item={item}
                        onEdit={() =>
                            setSelectedItem(
                                item
                            )
                        }
                        onDelete={() =>
                            deleteArtwork(
                                item
                            )
                        }
                    />

                ))}
            </div>
            </SortableContext>
            </DndContext>
            {selectedItem && (
                <EditPortfolioModal
                    item={selectedItem}
                    onClose={() =>
                        setSelectedItem(null)
                    }
                />
            )}
        </div>
    );
}