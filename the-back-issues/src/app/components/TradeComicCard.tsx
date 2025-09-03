"use client";

import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";

export default function ComicCard({ comic, type }: { comic: any; type: "own" | "want" }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${type}-${comic.id}`,
    data: { comic, type },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0 : 1, //This will hide the original comic while the drag is in action
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-24 cursor-grab rounded-xl overflow-hidden shadow hover:scale-105 transition"
    >
      {comic.frontCover ? (
        <Image
          src={`data:image/jpeg;base64,${comic.frontCover.toString("base64")}`}
          alt={comic.Series?.title ?? "Comic"}
          width={96}
          height={140}
          className="object-cover w-full h-36"
        />
      ) : (
        <div className="bg-gray-200 w-full h-36 flex items-center justify-center text-sm text-gray-500">
          No Cover
        </div>
      )}
      <p className="text-xs truncate px-1 text-center">
        {comic.Series?.title} #{comic.issue}
      </p>
    </div>
  );
}
