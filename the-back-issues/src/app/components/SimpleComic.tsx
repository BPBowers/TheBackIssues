import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import type { ComicBook } from '../types/comic'
import Image from 'next/image'

interface SimpleComicProps {
    comic: ComicBook
}

const SimpleComic: React.FC<SimpleComicProps> = ({ comic }) => {
    
    const base64CoverF = comic?.frontCover || '';
    const imgSrcF = base64CoverF ? `data:image/jpeg;base64,${base64CoverF}` : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';

    const base64CoverB = comic?.backCover || '';
    const imgSrcB = base64CoverB ? `data:image/jpeg;base64,${base64CoverB}` : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg';
    
    const [currentImage, setCurrentImage] = useState(imgSrcF)

    const handleMouseEnter = () => {
        setCurrentImage(imgSrcB)
    }

    const handleMouseLeave = () => {
        setCurrentImage(imgSrcF)
    }

    return (
        <div>
            {/*<Image src={currentImage} alt="Cover" width={200} height={300} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>*/}
            <Link href={`/comic/3d/${comic.id}`}>
                <Image src={imgSrcF} alt="Cover" width={200} height={300} className="bg-amber-800 p-0.5 hover:bg-amber-600 ease-in-out hover:-translate-y-2 hover:scale-110 rounded-md motion-opacity-in-0 motion-scale-in-0 hover:motion-opacity-in-100 hover:motion-scale-in-100 transition-all duration-300"/>
            </Link>
        </div>
    )
}

export default SimpleComic