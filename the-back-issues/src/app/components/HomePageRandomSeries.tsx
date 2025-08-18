'use client'
import type { ComicBook } from '../types/comic'
import { useEffect, useState } from 'react'
import SimpleComic from './SimpleComic'

export default function HomePageRandomSeries() {
    const [comics, setComics] = useState<ComicBook[]>([])
    const [startIndex, setStartIndex] = useState(0)
    const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/comic')
        .then(res => res.json())
            .then(data => {
                setComics(data)
            
                //Below Selects the random series to showcase
                if (data.length > 0) {
                    const uniqueSeries = [...new Set(data.map((c: ComicBook) => c.seriesTitle))]
                    const randomSeries = uniqueSeries[Math.floor(Math.random() * uniqueSeries.length)]
                    setSelectedSeries(randomSeries)
                }
            })
    }, [])

    //Filter by most 5 recently released comic books (Function not ready yet)
    const filiteredComics = selectedSeries
        ? comics.filter(c => c.seriesTitle === selectedSeries)
        : []

    const sortedComics = [...filiteredComics].sort((a, b) =>(a.issue ?? 0) - (b.issue ?? 0))

    const displayedComics = sortedComics.slice(startIndex, startIndex + 5)

    const handlePrev = () => {
        setStartIndex(prev => Math.max(prev -1, 0))
    }

    const handleNext = () => {
        setStartIndex(prev => Math.min(prev + 1, sortedComics.length -5))
    }

    return (
        <div>
                <div className="flex justify-center text-2xl font-bold font-serif">
                    Random Series: {selectedSeries}
                </div>
            <div  style={{ display: 'flex', alignItems: 'center'}}>
                <button onClick={handlePrev} disabled={startIndex === 0} className="hover:text-amber-400">
                    ◀
                </button>
                <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none'}}>
                    {displayedComics.map((comic) => (
                        <li key={comic.id}>
                            <SimpleComic comic={comic}/>
                        </li>
                    ))}
                </ul>
                <button onClick={handleNext} disabled={startIndex >= sortedComics.length - 5} className="hover:text-amber-400">
                ▶  
                </button>
            </div>
        </div>
    )
}