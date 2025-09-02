//src/app/components/TradeBoard.tsx
"use client";

import { useTrade } from "../hooks/useTrade";
import TradeCard from "./TradeCard";

export default function TradeBoard() {
  const { trades, loading } = useTrade();

  if (loading) return <p>Loading trades...</p>;
  if (!trades.length) return <p>No trades available.</p>;

  return (
    <div className="grid gap-4">
      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} />
      ))}
    </div>
  );
}