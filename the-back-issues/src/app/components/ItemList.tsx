'use client'
import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

interface ComicBook {
    id: number;
    issue?: number | null;
    frontCover?: string | null;
    backCover?: string | null;
    coverPrice?: number | null;
    releaseDate?: string | null;
    seriesTitle?: string | null;
}

export default function ItemList() {
    const [comics, setComics] = useState<ComicBook[]>([])

    useEffect(() => {
        fetch('/api/comic')
        .then(res => res.json())
        .then(data => setComics(data))
    }, [])

    return (
        <div>
            <ul>
                {comics.map((comic) => (
                    comic?.issue != undefined && (
                    <li key={comic.id}>
                        <ItemCard comic={comic}/>
                    </li>
                )))}
            </ul>
        </div>
    )
}