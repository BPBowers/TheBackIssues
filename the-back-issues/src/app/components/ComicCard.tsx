// src/app/components/ComicCard.tsx
"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ComicBook } from "../types/comic"
import { useSession } from "next-auth/react"

interface ComicCardProps {
    comic: ComicBook & { owns?: boolean; wants?: boolean};
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
    const { data: session } = useSession()
    const [owns, setOwns] = useState(comic.owns || false)
    const [wants, setWants] = useState(comic.wants || false)

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
    const displayReleaseDate = comic.releaseDate
        ? new Date(comic.releaseDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            })
        : "Unknown";
    
    const coverArtist = 
            comic.artists
                .filter((a)=>a.role === "COVER_ARTIST")
                .map((a)=>`${a.artist.firstName} ${a.artist.lastName}`)
                .join(", ") || "N/A";

    const writers = 
            comic.artists
                .filter((a)=>a.role === "WRITER")
                .map((a)=>`${a.artist.firstName} ${a.artist.lastName}`)
                .join(", ") || "N/A";
    
    const letterers = 
            comic.artists
                .filter((a)=>a.role === "LETTERER")
                .map((a)=>`${a.artist.firstName} ${a.artist.lastName}`)
                .join(", ") || "N/A";

    const groupedArtists = (() => {
        const grouped = comic.artists
        .filter(a => a.role !== "WRITER" && a.role !== "LETTERER" && a.role !== "COVER_ARTIST")
        .reduce((acc, curr) => {
            const id = curr.artist.id;
            if(!acc[id]) {
                acc[id] = {
                    name: `${curr.artist.firstName} ${curr.artist.lastName}`,
                    roles: new Set<string>(),
                };
            }
            acc[id].roles.add(curr.role);
            return acc;
        }, {} as Record<number, {name: string; roles: Set<string> }>);
        return Object.values(grouped)
            //.map((entry) => `${entry.name} (${Array.from(entry.roles).join(", ")})`)
            .map((entry)=>`${entry.name}`)
            .join(", ") || "N/A"
        })()

    const displayCoverPrice = comic.coverPrice != null ? `$${Number(comic.coverPrice).toFixed(2)}` : 'N/A'

    return (
    <div className="flex border border-amber-700 bg-base-100 shadow-md rounded-lg overflow-hidden max-w-3xl min-h-[300px] motion-opacity-in-0 motion-scale-in-0 transition-all duration-300">
      {/* LEFT MARGIN */}
      <div className="flex flex-col items-center w-1/4 p-4">
        <img
          src={imgSrc}
          alt="Comic Cover"
          className="rounded-md shadow-md w-full h-auto"
        />
        <p className="text-xs mt-2 text-gray-400">
          <span className="font-bold">Cover Artist: </span>
          <span className="text-blue-500">{coverArtist}</span>
        </p>
      </div>

      {/* MIDDLE MARGIN */}
      <div className="flex flex-col w-2/4 p-4 space-y-3">
        {/* Titlebar */}
        <Link href={`/comic/3d/${comic.id}`}>
          <h2 className="text-xl font-bold hover:underline hover:text-blue-500">
            {comic.seriesTitle || "Unknown"} {displayIssue} |{" "}
            {comic.publisherName || "Unknown"}
          </h2>
        </Link>

        {/* Tags */}
        <div className="flex space-x-2">
          <span className="px-0.5 py-0.5 text-xs bg-blue-200 text-blue-800 rounded-full">
            Superhero
          </span>
          {/* Add more tags when backend ready */}
        </div>
        <p className="text-xs text-blue-500 cursor-pointer hover:underline">
          More tags...
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs mt-2">
          {/* Left column */}
          <div>
            <p>
              <span className="font-bold">Writer(s): </span>
              <span className="text-blue-500">{writers}</span>
            </p>
            <p>
              <span className="font-bold">Artist(s): </span>
              <span className="text-blue-500">{groupedArtists}</span>
            </p>
            <p>
              <span className="font-bold">Letterer(s): </span>
              <span className="text-blue-500">{letterers}</span>
            </p>
          </div>

          {/* Right column */}
          <div>
            <p>
              <span className="font-bold">Release Date: </span>
              {displayReleaseDate}
            </p>
            <p>
              <span className="font-bold">Cover Price: </span>
              {displayCoverPrice}
            </p>
            <p>
              <span className="font-bold">Value (New): </span>$0.00
            </p>
            <p>
              <span className="font-bold">Value (Used): </span>$0.00
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT MARGIN */}
      <div className="text-xs flex flex-col w-1/4 p-4 space-y-3">
        <h3 className="font-bold text-m">Community Stats</h3>
        <p>
          {owns ? "You and others own this issue" : "X users own this issue"}
        </p>
        <p>{wants ? "You want this issue" : "X users want this issue"}</p>
        <p>X users offering to trade</p>

        {/* Collection Checkboxes */}
        <div>
            <h3 className="font-bold text-m">Your Collection</h3>
            <label className="flex items-center space-x-2">
                <input
                type="checkbox"
                checked={owns}
                onChange={toggleOwn}
                className="w-4 h-4"
                />
                <span>I own this book</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                 type="checkbox"
                  checked={wants}
                  onChange={toggleWant}
                  className="w-4 h-4"
                />
                <span>I want this book</span>
          </label>
        </div>
      </div>
    </div>
  )
}

//borderflex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-grey-500 via-purple-500 to-pink-500 h-64 w-full
export default ComicCard