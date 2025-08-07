import {PrismaClient} from '@prisma/client'
import ComicViewer from './ComicViewer'

const prisma = new PrismaClient()

export default async function ComicDetailsPage3d({ params }) {
    const comicId = parseInt(params.id)
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

    //If no comic exists by ID, Throw this error
    if (!comic) return <div>!ERROR! No comic found with ID: {comicId}</div>

    //Else comic with ID is found
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
        <ComicViewer frontCover={frontCover}/>
        <p><strong>Publisher:</strong> {comic.Series?.Publisher?.name || 'Unknown'}</p>
            <p><strong>Cover Price:</strong> ${comic.coverPrice?.toFixed(2)}</p>
            <p><strong>Release Date:</strong> {comic.releaseDate?.toString().slice(0, 10)}</p>
        </div>
    )
}