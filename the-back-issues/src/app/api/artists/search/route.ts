// src/app/api/artists/search/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

  if (!q) return NextResponse.json([])

  const artists = await prisma.artist.findMany({
    where: {
      OR: [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
      ],
    },
    take: 10,
    orderBy: { lastName: 'asc' },
  })

  return NextResponse.json(artists)
}