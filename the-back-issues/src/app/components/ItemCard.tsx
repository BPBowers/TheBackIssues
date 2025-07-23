import React from 'react'
import Link from 'next/link'

interface ComicBook {
    id: number;
    issue?: number | null;
    frontCover?: string | null;
    backCover?: string | null;
    coverPrice?: number | null;
    releaseDate?: string | null;
    seriesTitle?: string | null;
}

interface ItemCardProps {
    comic: ComicBook;
}

const ItemCard: React.FC<ItemCardProps> = ({ comic }) => {
    
    const base64Cover = comic?.frontCover || '';
    const imgSrc = base64Cover ? `data:image/jpeg;base64,${base64Cover}` : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';

    const displayIssue = comic.issue != null ? `#${comic.issue}` : 'Unknown Issue';
    const displayReleaseYear = comic.releaseDate ? new Date(comic.releaseDate).getFullYear() : 'Unknown';
    const displayCoverPrice = comic.coverPrice != null ? `$${Number(comic.coverPrice).toFixed(2)}` : 'N/A'

    return (
        <div className="border card card-side bg-base-100 shadow-sm">
            <img width="200vw" height="270vw" 
            src={imgSrc}
            alt="Comic Name" />
            <div className="card-body">
                <h2 className="card-title">{comic.seriesTitle || 'Unknown'} {displayIssue}</h2>
                <p className="font-bold">Writer</p>
                <p className="font-bold">Artist</p>
                <p className="font-bold">Release Date: {displayReleaseYear}</p>
                <p className="font-bold">Cover Price: {displayCoverPrice}</p>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    I own this book
                </div>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    I want this book
                </div>
                <div className="card-actions justify-self-end-safe">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"/>
                    I read this book
                </div>
                <div className="card-actions justify-end">
                    <Link href={`/comic/${comic.id}`}>
                        <button className="btn btn-primary">More info</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
//borderflex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-grey-500 via-purple-500 to-pink-500 h-64 w-full
export default ItemCard