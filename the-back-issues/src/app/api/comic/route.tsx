//ComicBook API Route
// ROUTE src/app/api/comic/route.tsx

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { issue, frontCover, backCover, coverPrice, releaseDate, seriesId, artists } = await req.json() 
    
    const newComic = await prisma.comicBook.create({
      data: {
        issue: Number(issue),
        frontCover: frontCover ? Buffer.from(frontCover, 'base64') : null,
        backCover: backCover ? Buffer.from(backCover, 'base64') : null,
        coverPrice: coverPrice ? Number(coverPrice) : null,
        releaseDate: new Date(releaseDate),
        Series: { connect: {id: Number(seriesId)}},
        artists: {
          create: artists?.map((a: {artistId: number; role: string})=>({
            artist: { connect: { id:a.artistId}},
            role: a.role,
          })) || [],
        },
      },
      include: { artists: {include: {artist: true}}}
    })

    return NextResponse.json(newComic, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add comic' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  
  const comics = await prisma.comicBook.findMany({
    include: {
      Series: {
        select: {
          title: true,
            Publisher: { select: { name: true } },
        },
      },
      artists: {
        select: {
          role: true,
          artist: {
            select: {
              id: true,
              firstName: true,
              middleName: true,
              lastName: true,
              ProfilePic: true,
            },
          },
        },
      },
        UserOwns: userId ? { where: { userId }, select: { userId: true} } : false,
        UserWants: userId ? { where: { userId }, select: { userId: true } } : false
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
    publisherName: comic.Series?.Publisher?.name || 'Unknown Publisher',
    owns: userId ? comic.UserOwns.length > 0 : false,
    wants: userId ? comic.UserWants.length > 0 : false,

    artists: comic.artists.map(a => ({
      role: a.role,
      artist: {
        id: a.artist.id,
        firstName: a.artist.firstName,
        middleName: a.artist.middleName,
        lastName: a.artist.lastName,
        profilePic: a.artist.ProfilePic,
      }
    })),
  }));

  return Response.json(comicWithBase64)
}