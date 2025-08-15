//ComicBook API Route
// ROUTE src/app/api/comic/route.tsx

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { issue, frontCover, backCover, coverPrice, releaseDate, seriesId } = await req.json() 
    
    const newComic = await prisma.comicBook.create({
      data: {
        issue: Number(issue),
        frontCover: frontCover ? Buffer.from(frontCover, 'base64') : null,
        backCover: backCover ? Buffer.from(backCover, 'base64') : null,
        coverPrice: coverPrice ? Number(coverPrice) : null,
        releaseDate: new Date(releaseDate),
        Series: { connect: {id: Number(seriesId)}},
      },
    })

    return NextResponse.json(newComic, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add comic' }, { status: 500 })
  }
}

export async function GET() {
  const comics = await prisma.comicBook.findMany({
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
    orderBy: [
      {
        Series: {
          title: 'asc',
        },
      },
      {
        issue: 'asc',
      },
    ],
  });
  const comicWithBase64 = comics.map(comic => ({
    id: comic.id, issue: comic.issue,
    frontCover: comic.frontCover ? Buffer.from(comic.frontCover).toString('base64') : null,
    backCover: comic.backCover ? Buffer.from(comic.backCover).toString('base64') : null,
    coverPrice: comic.coverPrice, releaseDate: comic.releaseDate,
    seriesTitle: comic.Series?.title || 'Unknown Series',
    publisherName: comic.Series?.Publisher?.name || 'Unknown Publisher'
  }));

  return Response.json(comicWithBase64)
}