// src/app/api/artists/search/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''

  if (!q) return NextResponse.json([])

  const artists = await prisma.$queryRawUnsafe<
    {id: number; firstName: string; middleName: string | null ; lastName: string;}>
    (
      `SELECT id, firstName, middleName, lastName, profilePic
      FROM Artist
      WHERE firstName LIKE '%' || ? || '%' COLLATE NOCASE
        OR lastName LIKE '%' || ? || '%' COLLATE NOCASE
        OR (firstName || ' ' || lastName) LIKE '%' || ? || '%' COLLATE NOSCASE
      ORDER BY lastName ASC
      LIMIT 10`,
    q,
    q,
    q
  )

  return NextResponse.json(artists)
}