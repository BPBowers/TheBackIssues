//Dynamic Page that is used to display the details of all Comics
import {PrismaClient} from '@prisma/client'
import Image from 'next/image'
//import CoverViewerWrapper from '@/app/components/CoverViewerWrapper'

const prisma = new PrismaClient()

interface ComicPageProps {
    params: {
        id: string
    }
}

//*/
export default async function ComicDetailsPage({ params }: ComicPageProps) {
//export default async function ComicDetailsPage({params,}: {params: { id: string};}) {
    //const comicId = parseInt(params.id)
    const { id } = await params;
    const comicId = parseInt(id);
    const comic = await prisma.comicBook.findUnique({
        where: {id: comicId},
        include: {
            Series: {
                include: {
                    Publisher: true,
                },
            },
        },
    })

    if (!comic) return <div>Error! Comic Not Found!</div>

    const frontCover = comic.frontCover
    ? `data:image/jpeg;base64,${Buffer.from(comic.frontCover).toString('base64')}`
    : 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/20/56966d674b06d/clean.jpg'

    const plainComic = {
        ...comic,
        coverPrice: comic.coverPrice?.toNumber?.() ?? null,
        releaseDate: comic.releaseDate?.toISOString() ?? null,
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                {comic.Series?.title || 'Unknown Series'} #{comic.issue}
            </h1>
            <img src={frontCover} alt="Front Cover" className="w-64 mb-4" />

            <p><strong>Publisher:</strong> {comic.Series?.Publisher?.name || 'Unknown'}</p>
            <p><strong>Cover Price:</strong> ${comic.coverPrice?.toFixed(2)}</p>
            <p><strong>Release Date:</strong> {comic.releaseDate?.toString().slice(0, 10)}</p>
            {/* Add more comic details here as needed */}
        </div>
  )
}