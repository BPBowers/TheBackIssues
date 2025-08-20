'use client'
import { useEffect, useState } from 'react'
import ItemCard from './ItemCard'
import type { ComicBook } from "../types/comic"

export default function OwnedItemList() {
    const [comics, setComics] = useState<ComicBook[]>([])
    const [filteredPublisher, setFilteredPublisher] = useState<string>('')
    const [filteredSeries, setFilteredSeries] = useState<string>('')
    const [filteredYear, setFilteredYear] = useState<string>("")


    useEffect(() => {
        fetch('/api/comic/owned')
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

    const availableYears = [
        ...new Set(
            comics
                .filter(c =>
                    (!filteredPublisher || c.publisherName === filteredPublisher) &&
                    (!filteredSeries || c.seriesTitle == filteredSeries)
                )
                .map(c => new Date(c.releaseDate).getFullYear().toString())
                .filter(Boolean)
        )
    ].sort((a, b) => a - b)

    const visibleComics = comics.filter(c => {
        const year = new Date(c.releaseDate).getFullYear().toString()
        return (
        (!filteredPublisher || c.publisherName === filteredPublisher)
        && (!filteredSeries || c.seriesTitle === filteredSeries)
        && (!filteredYear || year === filteredYear)
        )
    })

    return (
        <div>
            
            {/* Filter Controls */}
            <div className="flex justify-center gap-4 mb-6">
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
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={filteredYear}
                    onChange={(e) => setFilteredYear(e.target.value)}
                >
                    <option value="">All Years</option>
                    {availableYears.map(y => (
                    <option key={y} value={y}>{y}</option>
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