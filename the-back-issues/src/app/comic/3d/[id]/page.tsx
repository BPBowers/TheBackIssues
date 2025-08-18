import {PrismaClient} from '@prisma/client'
import ComicViewer from './ComicViewer'
import ItemCard from "../../../components/ItemCard"
import type { ComicBook } from "../../../types/comic"

const prisma = new PrismaClient()

export default async function ComicDetailsPage3d({ params }: { params: { id: string}}) {
    const comicId = parseInt(params.id)
    const comic = await prisma.comicBook.findUnique({
        where: {id: comicId},
        include: {
            Series: {
                select: {
                    title: true,
                        Publisher: {
                            select: {
                                name: true
                            }
                        }
                }
            }
        },
    });
    //If no comic exists by ID, Throw this error
    if (!comic) return <div>!ERROR! No comic found with ID: {comicId}</div>

    const formattedComic: ComicBook = {
        id: comic.id,
        issue: comic.issue,
        frontCover: comic.frontCover
            ? Buffer.from(comic.frontCover).toString('base64')
            : null,
        backCover : comic.backCover
            ? Buffer.from(comic.backCover).toString('base64')
            : null,
        coverPrice: comic.coverPrice?.toNumber() ?? null,
        releaseDate: comic.releaseDate?.toISOString() ?? null,
        seriesTitle: comic.Series?.title || 'Unknown Series',
        publisherName: comic.Series?.Publisher?.name || 'Unknown Publisher',
    };

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
        <ItemCard comic={formattedComic}/>
        <p><strong>Release Date:</strong> {comic.releaseDate?.toString().slice(0, 15)}</p>
        {/*Update Comic Cover*/}
        </div>
    )
}