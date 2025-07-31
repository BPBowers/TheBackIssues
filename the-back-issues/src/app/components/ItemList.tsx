'use client'
import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import type { ComicBook } from "../types/comic" 

/*interface ComicBook {
    id: number;
    issue?: number | null;
    frontCover?: string | null;
    backCover?: string | null;
    coverPrice?: number | null;
    releaseDate?: string | null;
    seriesTitle?: string | null;
    publisherName?: string| null;
}
*/
export default function ItemList() {
    const [comics, setComics] = useState<ComicBook[]>([])
    const [filteredPublisher, setFilteredPublisher] = useState<string>('')
    const [filteredSeries, setFilteredSeries] = useState<string>('')
    
    useEffect(() => {
        fetch('/api/comic')
        .then(res => res.json())
        .then(data => setComics(data))
    }, [])

   const availablePublishers = [
        ...new Set(
                comics.map(c => c.publisherName)
                .filter(Boolean)
    )]

    const availableSeries = [
        ...new Set(
            comics.filter(
                c=> !filteredPublisher || c.publisherName === filteredPublisher)
                .map(c => c.seriesTitle)
                .filter(Boolean)
    )]

    const visibleComics = comics.filter(c =>
        (!filteredPublisher || c.publisherName === filteredPublisher)
        && (!filteredSeries || c.seriesTitle === filteredSeries)
    )

    return (
        <div>
            
            {/* Filter Controls */}
            <div className="flex gap-4 mb-6">
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filteredPublisher}
                    onChange={(e) => {
                    setFilteredPublisher(e.target.value)
                    setFilteredSeries('')
                }}>
                <option value="">All Publishers</option>
                    {availablePublishers.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
                </select>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filteredSeries}
                    onChange={(e) => setFilteredSeries(e.target.value)

                }>
                    <option value="">All Series</option>
                    {availableSeries.map(s => (
                    <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            <ul>
                {visibleComics.map((comic) => (
                    comic?.issue != undefined && (
                    <li key={comic.id}>
                        <ItemCard comic={comic}/>
                    </li>
                )))}
            </ul>
        </div>
    )
}