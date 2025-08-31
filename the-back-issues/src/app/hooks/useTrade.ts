"use client";

import { useEffect, useState } from 'react';

export function useTrade() {
    const [trades, setTrades] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/trades")
            .then((res) =>res.json())
            .then(setTrades)
            .finally(() => setLoading(false));
    }, []);

    const createTrade = async (trade: any) => {
        const res = await fetch("/api/trades", {
            method: "POST",
            body: JSON.stringify(trade),
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to create new trade");
        const newTrade = await res.json();
        setTrades((prev) => [newTrade, ...prev]);
    };

    return { trades, loading, createTrade };
}