"use client";

import { useState } from "react";
import { DndContext, DragOverlay, useDraggable } from "@dnd-kit/core";
import ComicCard from "./TradeComicCard";
import TradeBucket from "./TradeBucket";
import { useTrade } from "../hooks/useTrade";
import type { ComicBook } from "../types/comic";

export default function TradePostForm({
  userOwns,
  allComics,
}: {
  userOwns: ComicBook[];
  allComics: ComicBook[];
}) {
  const { createTrade } = useTrade();
  const [offers, setOffers] = useState<ComicBook[]>([]);
  const [wants, setWants] = useState<ComicBook[]>([]);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [exactMatch, setExactMatch] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const [activeComic, setActiveComic] = useState<ComicBook | null>(null);

  const handleDragStart = (event: any) => {
    const { comic } = event.active.data.current;
    setActiveComic(comic);
    setIsDragging(true);
  };

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    setActiveComic(null);
    setIsDragging(false);
    if (!over) return;

    const { comic, type } = active.data.current;

    if (over.id === "offers" && type === "own") {
      setOffers((prev) => (prev.find((c) => c.id === comic.id) ? prev : [...prev, comic]));
    }

    if (over.id === "wants") {
      setWants((prev) => (prev.find((c) => c.id === comic.id) ? prev : [...prev, comic]));
    }
};

  function removeOffer(comicId: number) {
    setOffers((prev) => prev.filter((c) => c.id !== comicId));
  }
  function removeWant(comicId: number) {
    setWants((prev) => prev.filter((c) => c.id !== comicId));
  }

  function handleAddOffer(comic: ComicBook) {
  setOffers((prev) => 
    prev.find((c) => c.id === comic.id) ? prev : [...prev, comic]
  );
}

function handleAddWant(comic: ComicBook) {
  setWants((prev) => 
    prev.find((c) => c.id === comic.id) ? prev : [...prev, comic]
  );
}

const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  await createTrade({
    location,
    message,
    exactMatch,
    offers: offers.map((c) => ({ comicBookId: c.id, quantity: 1 })),
    wants: wants.map((c) => ({ comicBookId: c.id, quantity: 1 })),
  });

  setOffers([]);
  setWants([]);
  setLocation("");
  setMessage("");
  setExactMatch(true);
};
  return (
    <form onSubmit={submit} className="border-amber-700 border bg-base-100 rounded-xl shadow-sm motion-opacity-in-0 motion-scale-in-0 hover:motion-opacity-in-100 hover:motion-scale-in-100 transition-all duration-300 p-4">
      <h2 className="text-xl font-bold mb-4">Create a Trade</h2>

      <label className="block mb-2">
        Location
        <input
          className="w-full border rounded p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <label className="block mb-2">
        Message
        <textarea
          className="w-full border rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
        />
      </label>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={exactMatch}
          onChange={(e) => setExactMatch(e.target.checked)}
        />
        Exact Match Required
      </label>

      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="grid grid-cols-2 gap-6">
          {/* Owned Comics */}
          <div>
            <h3 className="font-semibold mb-2">Your Comics</h3>
              <div className={`flex gap-2 flex-wrap max-h-60 overflow-y-auto ${isDragging ? "overflow-hidden" : "overflow-y-auto"}`}>
                {userOwns.map((comic) => (
                <ComicCard key={comic.id} comic={comic} type="own" />
                ))}
              </div>
          </div>

          {/* All Comics (for wants) */}
          <div>
            <h3 className="font-semibold mb-2">Available Comics</h3>
            <div className={`flex gap-2 flex-wrap max-h-60 overflow-y-auto ${isDragging ? "overflow-hidden" : "overflow-y-auto"}`}>
              {allComics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} type="want" />
              ))}
            </div>
          </div>
        </div>

        {/* Buckets */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <TradeBucket id="offers" title="Offer Bucket" comics={offers} onRemove={removeOffer}/>
          <TradeBucket id="wants" title="Want Bucket" comics={wants} onRemove={removeWant}/>
        </div>

        {/*This is the drag function that displays it over the entire site*/}
        <DragOverlay>
          {activeComic ? (
            <div className="w-20">
              <img src={`data:image/jpeg;base64,${activeComic.frontCover}`} alt={activeComic.Series?.title}/>
              <p className="text-xs truncate text-center text-black bg-white">

              </p>
              </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <button
        type="submit"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Post Trade
      </button>
    </form>
  );
}
