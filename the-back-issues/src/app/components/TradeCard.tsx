//src/app/components/TradeCard.tsx
"use client";
import { Trade_Winds } from "next/font/google";
import { useRouter } from "next/navigation";

export default function TradeCard({ trade }: {trade: any}) {
    const router = useRouter();

    return (
        <div>
            <div className="border rounded-xl shadow-md p-4 bg-white">
                <h3 className="text-lg font-semibold">{trade.user?.name ?? "Anonymous"}</h3>
                <p className="text-sm text-gray-500">{trade.location}</p>

                <div className="mt-2">
                    <p className="font medium">Offers:</p>
                    <ul className="list-disc list-inside">
                        {trade.offers.map((o: any) => (
                            <li key={o.id}>
                             {o.comicBook.series?.title} #{o.comicBook.issue} (x{o.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-3 flex gap-2">
                <button onClick={()=>router.push(`/trades/${trade.id}`)} className="bg-blue-500 text-white px-3 rounded-lg">
                    View
                </button>
                {!trade.exactMatch && (
                    <button onClick={() => router.push(`/trades/${trade.id}/counter`)} className= "bg-green-500 text-white px-3 py-1 rounded-lg">
                        Create a Counter Offer
                    </button>
                )}
            </div>
        </div>
    )
}