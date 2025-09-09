// src/app/api/comic/[id]/route.ts
// Comic API route to fetch for a specific comic

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

//GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comicId = parseInt(params.id, 10)

  try {
    const comic = await prisma.comicBook.findUnique({
      where: { id: comicId },
      include: {
        Series: {
          include: { Publisher: true },
        },
        artists: {
          include: { artist: true },
        },
      },
    })

    if (!comic) {
      return NextResponse.json({ error: 'Comic not found' }, { status: 404 })
    }

    return NextResponse.json(comic)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch comic' }, { status: 500 })
  }
}

// PUT
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comicId = parseInt(params.id, 10)
  const data = await req.json()

  try {
    // update comicBook fields
    const updatedComic = await prisma.comicBook.update({
      where: { id: comicId },
      data: {
        issue: data.issue ?? null,
        coverPrice: data.coverPrice ? parseFloat(data.coverPrice) : null,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        frontCover: data.frontCover ? Buffer.from(data.frontCover, 'base64') : null,
        backCover: data.backCover ? Buffer.from(data.backCover, 'base64') : null,
        seriesID: data.Series?.id ?? data.seriesId ?? undefined,

        // reset & recreate artists (many-to-many via WorkedOn)
        artists: {
          deleteMany: {}, // remove existing links
          create: data.artists?.map((a: any) => ({
            role: a.role,
            artist: { connect: { id: a.artistId } },
          })) || [],
        },
      },
      include: {
        Series: { include: { Publisher: true } },
        artists: { include: { artist: true } },
      },
    })

    return NextResponse.json(updatedComic)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update comic' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const comicId = parseInt(params.id, 10)

  try {
    await prisma.comicBook.delete({ where: { id: comicId } })
    return NextResponse.json({ message: 'Comic deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete comic' }, { status: 500 })
  }
}