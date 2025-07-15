import { Blob } from 'buffer';
import React from 'react'

interface ComicBook {
    id: number;
    issue: number;
    frontCover: Blob;
    backCover: Blob;
    coverPrice: number;
    releaseDate: Date;
}

const ItemCard = async () => {
    
    //const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: { revalidate: 10 } });
    //const users: ComicBook[] = await res.json();

    return (
        <div className="border card card-side bg-base-100 shadow-sm">
            <img width="200vw" height="270vw" src="https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg" alt="Comic Name" />
            <div className="card-body">
                <h2 className="card-title">
                    Comic Name
                </h2>
                <p className="font-bold">Writer</p>
                <p className="font-bold">Artist</p>
                <p className="font-bold">Year</p>
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
                    <button className="btn btn-primary">More info</button>
                </div>
            </div>
        </div>
    )
}
//borderflex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-grey-500 via-purple-500 to-pink-500 h-64 w-full
export default ItemCard