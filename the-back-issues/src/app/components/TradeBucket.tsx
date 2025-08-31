"use client";

import { useDroppable } from "@dnd-kit/core";

export default function TradeBucket({
  id,
  title,
  comics,
}: {
  id: string;
  title: string;
  comics: any[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[150px] border-2 border-dashed rounded-xl p-3 transition 
        ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"}`}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      {comics.length === 0 ? (
        <p className="text-sm text-gray-500">Drag comics here</p>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {comics.map((comic) => (
            <div key={comic.id} className="w-20">
              <img
                src={`data:image/jpeg;base64,${comic.frontCover?.toString("base64")}`}
                alt={comic.Series?.title}
                className="rounded shadow object-cover h-28 w-full"
              />
              <p className="text-xs truncate text-center">{comic.Series?.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}