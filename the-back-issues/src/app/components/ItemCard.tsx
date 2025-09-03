// src/app/components/ItemCard.tsx
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ComicBook } from "../types/comic"
import { useSession } from "next-auth/react"

interface ItemCardProps {
    comic: ComicBook & { owns?: boolean; wants?: boolean};
}

const ItemCard: React.FC<ItemCardProps> = ({ comic }) => {
    const { data: session } = useSession()
    //const [owns, setOwns] = useState(false)
    //const [wants, setWants] = useState(false)
    const [owns, setOwns] = useState(comic.owns || false)
    const [wants, setWants] = useState(comic.wants || false)

    //Fetch want and own state from API (Inefficent)
    /*useEffect(() => {
        if(!session?.user?.id) return
        fetch(`/api/comic/${comic.id}/status`)
            .then(res => res.json())
            .then(data => {
                setOwns(data.owns)
                setWants(data.wants)
            })
    }, [comic.id, session?.user?.id])
    */

    //Owns & Wants Handlers
    const toggleOwn = async () => {
        const res = await fetch(`/api/comic/${comic.id}/own`, {method: "POST"})
        if(res.ok) setOwns(!owns)
    }

    const toggleWant = async () => {
        const res = await fetch(`/api/comic/${comic.id}/want`, { method: "POST"})
        if (res.ok) setWants(!wants)
    }

    const base64Cover = comic?.frontCover || '';
    const imgSrc = base64Cover ? `data:image/jpeg;base64,${base64Cover}` : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';

    const displayIssue = comic.issue != null ? `#${comic.issue}` : 'Unknown Issue';
    const displayReleaseYear = comic.releaseDate ? new Date(comic.releaseDate).getFullYear() : 'Unknown';
    const displayCoverPrice = comic.coverPrice != null ? `$${Number(comic.coverPrice).toFixed(2)}` : 'N/A'

    return (
        <div className="border-amber-700 border card card-side bg-base-100 shadow-sm motion-opacity-in-0 motion-scale-in-0 hover:motion-opacity-in-100 hover:motion-scale-in-100 transition-all duration-300">
            <img width="200vw" height="270vw" 
            src={imgSrc}
            alt="Comic Name" className="rounded-xl"/>
            <div className="card-body">
                <h2 className="card-title">{comic.seriesTitle || 'Unknown'} {displayIssue}</h2>
                <p className="font-bold">Publisher:  <span className="font-normal ">{comic.publisherName || 'Unknown'}</span></p>
                <p className="font-bold">Writer(s): <span className="font-normal"></span></p>
                <p className="font-bold">Artist(s): <span className="font-normal"></span></p>
                <p className="font-bold">Release Year: <span className="font-normal">{displayReleaseYear}</span></p>
                <p className="font-bold">Cover Price: <span className="font-normal">{displayCoverPrice}</span></p>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" checked={owns} onChange={toggleOwn} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    I own this book
                </div>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" checked={wants} onChange={toggleWant} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    I want this book
                </div>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    Looking to trade this book
                </div>
                <div className="card-actions justify-end">
                    <Link href={`/comic/3d/${comic.id}`}>
                        <button className="btn btn-soft border-blue-600 text-black-600 bg-gradient-to-br to-blue-600 hover:animate-pulse">More info</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
//borderflex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-grey-500 via-purple-500 to-pink-500 h-64 w-full
export default ItemCard