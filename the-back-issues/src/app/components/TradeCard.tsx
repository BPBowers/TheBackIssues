// src/app/components/TradeCard.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ComicBook } from '../type/comic';

export default function TradeCard({ trade }: { trade: any }) {
  const router = useRouter();

  const MAX_WANTS_DISPLAY = 5;
  const wantsToShow = trade.wants.slice(0, MAX_WANTS_DISPLAY);
  const wantsRemaining = trade.wants.length - MAX_WANTS_DISPLAY;

  return (
    <div className="border-amber-700 border card card-side bg-base-100 shadow-sm motion-opacity-in-0 motion-scale-in-0 hover:motion-opacity-in-100 hover:motion-scale-in-100 transition-all duration-300 text-white">
      <h3 className="text-lg font-semibold">{trade.user?.name ?? "Anonymous"}</h3>
      <p className="text-sm text-gray-500">{trade.location}</p>

      {/* Offers */}
      <div className="mt-3">
        <p className="font-medium">Offers:</p>
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {trade.offers.map((o: any) => (
            <div key={o.id} className="w-20 flex-shrink-0 text-center">
              {o.comicBook.frontCover ? (
                <Image
                  src={`data:image/jpeg;base64,${o.comicBook.frontCover}`}
                  alt={`${o.comicBook.series?.title} #${o.comicBook.issue}`}
                  width={80}
                  height={120}
                  className="rounded-lg shadow-sm object-cover"
                />
              ) : (
                <div className="w-20 h-28 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  No Cover
                </div>
              )}
              <p className="text-xs mt-1">
                {o.comicBook.series?.title} #{o.comicBook.issue} (x{o.quantity})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wants */}
      <div className="mt-4">
        <p className="font-medium">Wants:</p>
        <ul className="list-disc list-inside text-sm mt-1">
          {wantsToShow.map((w: any) => (
            <li key={w.id}>
              {w.comicBook.series?.title} #{w.comicBook.issue} (x{w.quantity})
            </li>
          ))}
          {wantsRemaining > 0 && (
            <li className="text-gray-500">+ {wantsRemaining} more</li>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
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
  );
}