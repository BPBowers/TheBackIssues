// src/app/components/TradeCard.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TradeCard({ trade }: { trade: any }) {
  const router = useRouter();

  const [offerIndex, setOfferIndex] = useState(0);
  const [wantIndex, setWantIndex] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showWantModal, setShowWantModal] = useState(false);


  // Cycle offers every 2s
  useEffect(() => {
    if (showOfferModal) return;
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % trade.offers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [trade.offers.length]);

  // Cycle wants every 2s
  useEffect(() => {
    if (showWantModal) return;
    const interval = setInterval(() => {
      setWantIndex((prev) => (prev + 1) % trade.wants.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [trade.wants.length]);

  const MAX_WANTS_DISPLAY = 5;
  const wantsToShow = trade.wants.slice(0, MAX_WANTS_DISPLAY);
  const wantsRemaining = trade.wants.length - MAX_WANTS_DISPLAY;

  return (
    <div className="relative flex items-center justify-between border border-amber-700 bg-base-100 shadow-sm rounded-xl text-white w-200 h-45">

      {/* Left Cover Cycler (Offers) */}
      <div
        className="w-28 cursor-pointer"
        onMouseEnter={() => setShowOfferModal(true)}
        onMouseLeave={() => setShowOfferModal(false)}
      >
        {trade.offers.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${trade.offers[offerIndex].comicBook.frontCover}`}
            alt={`${trade.offers[offerIndex].comicBook.series?.title} #${trade.offers[offerIndex].comicBook.issue}`}
            className="rounded-lg shadow-md object-cover w-full"
          />
        )}

        {/* Modal with arrows */}
        {showOfferModal && (
          <div className="absolute top-0 left-0 bg-black/80 p-4 rounded-xl shadow-lg z-20 w-72">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setOfferIndex(
                    (offerIndex - 1 + trade.offers.length) % trade.offers.length
                  )
                }
                className="px-2 text-lg"
              >
                ◀
              </button>
              <img
                src={`data:image/jpeg;base64,${trade.offers[offerIndex].comicBook.frontCover}`}
                alt="Offer cover"
                className="rounded-lg shadow-md object-cover w-48"
              />
              <button
                onClick={() =>
                  setOfferIndex((offerIndex + 1) % trade.offers.length)
                }
                className="px-2 text-lg"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Center Info */}
      <div className="flex-1 text-center px-4">
        <p className="text-lg font-semibold">{trade.user?.name ?? "Anonymous"}</p>
        <p className="text-sm text-gray-400">{trade.location}</p>

        <div className="mt-3">
          <p className="font-medium">{trade.message}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={() => router.push(`/trades/${trade.id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            View
          </button>
          {!trade.exactMatch && (
            <button
              onClick={() => router.push(`/trades/${trade.id}/counter`)}
              className="bg-green-500 text-white px-3 py-1 rounded-lg"
            >
              Create a Counter Offer
            </button>
          )}
        </div>
      </div>

      {/* Right Cover Cycler (Wants) */}
      <div
        className="w-28 cursor-pointer"
        onMouseEnter={() => setShowWantModal(true)}
        onMouseLeave={() => setShowWantModal(false)}
      >
        {trade.wants.length > 0 && (
          <img
            src={`data:image/jpeg;base64,${trade.wants[wantIndex].comicBook.frontCover}`}
            alt={`${trade.wants[wantIndex].comicBook.series?.title} #${trade.wants[wantIndex].comicBook.issue}`}
            className="rounded-lg shadow-md object-cover w-full"
          />
        )}

        {/* Modal with arrows */}
        {showWantModal && (
          <div className="absolute top-0 right-0 bg-black/80 p-4 rounded-xl shadow-lg z-20 w-72">
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setWantIndex(
                    (wantIndex - 1 + trade.wants.length) % trade.wants.length
                  )
                }
                className="px-2 text-lg"
              >
                ◀
              </button>
              <img
                src={`data:image/jpeg;base64,${trade.wants[wantIndex].comicBook.frontCover}`}
                alt="Want cover"
                className="rounded-lg shadow-md object-cover w-48"
              />
              <button
                onClick={() =>
                  setWantIndex((wantIndex + 1) % trade.wants.length)
                }
                className="px-2 text-lg"
              >
                ▶
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}