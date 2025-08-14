'use client'
import type { ComicBook } from '../types/comic'
import { useEffect, useState } from 'react'
import SimpleComic from './SimpleComic'

export default function HomePageNewComics() {
    const [comics, setComics] = useState<ComicBook[]>([])
    const [startIndex, setStartIndex] = useState(0)

    useEffect(() => {
        fetch('/api/comic')
        .then(res => res.json())
        .then(data => setComics(data))
    }, [])

    //Filter by most 5 recently released comic books (Function not ready yet)
    const sortedComics = [...comics]
        .filter(c => c.releaseDate) //Ensures data exists (All my examples dont lol)
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        .slice(0, 10)

    const displayedComics = sortedComics.slice(startIndex, startIndex + 5)

    const handlePrev = () => {
        setStartIndex(prev => Math.max(prev -1, 0))
    }

    const handleNext = () => {
        setStartIndex(prev => Math.min(prev + 1, sortedComics.length -5))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <button onClick={handlePrev} disabled={startIndex === 0}>
                ◀
            </button>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none'}}>
                {displayedComics.map((comic) => (
                    <li key={comic.id}>
                        <SimpleComic comic={comic}/>
                    </li>
                ))}
            </ul>
            <button onClick={handleNext} disabled={startIndex >= sortedComics.length - 5}>
              ▶  
            </button>
        </div>
    )
}
