"use client"

import TradePostForm from "../../components/TradePostForm"
import { useEffect, useState } from 'react'
import type { ComicBook } from "../../types/comic"

export default function NewTradePostPage () {
        const [ownedComics, setOwnedComics] = useState<ComicBook[]>([])
        const [allComics, setAllComics] = useState<ComicBook[]>([])

        useEffect(() => {
                fetch('/api/comic/owned')
                .then(res => res.json())
                .then(data => setOwnedComics(data))
            }, [])

        useEffect(() => {
                fetch('/api/comic/')
                .then(res => res.json())
                .then(data => setAllComics(data))
            }, [])

    return (
        <div>
            <TradePostForm userOwns={ownedComics} allComics={allComics}/>
        </div>
    )
}