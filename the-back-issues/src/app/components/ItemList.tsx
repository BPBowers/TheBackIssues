'use client'
import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

interface ComicBook {
    id: number;
    issue: number;
    frontCover: string;
    backCover: string;
    coverPrice: number;
    releaseDate: string;
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
            <h1>Comic List</h1>
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