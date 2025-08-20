//ComicBook API Route
// ROUTE src/app/api/comic/owned/route.tsx

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({error: "Please Login to View Collection"}, {status: 401})
  }

  const userId = session.user.id

  const comics = await prisma.comicBook.findMany({
    where: {
      UserOwns: {
        some: { userId },
      },
    },
    include: {
      Series: {
        select: {
          title: true,
          Publisher: {
            select: { name: true }
          }
        }
      },
      UserOwns: {
        where: { userId },
        select: { quantity: true }, // so you can also see how many copies they own
      },
    },
    orderBy: [
      { Series: { title: 'asc' }},
      { issue: 'asc' },
    ],
  });

  const comicWithBase64 = comics.map(comic => ({
    id: comic.id,
    issue: comic.issue,
    frontCover: comic.frontCover ? Buffer.from(comic.frontCover).toString('base64') : null,
    backCover: comic.backCover ? Buffer.from(comic.backCover).toString('base64') : null,
    coverPrice: comic.coverPrice,
    releaseDate: comic.releaseDate,
    seriesTitle: comic.Series?.title || 'Unknown Series',
    publisherName: comic.Series?.Publisher?.name || 'Unknown Publisher',
    quantity: comic.UserOwns[0]?.quantity ?? 1,
  }));

  return Response.json(comicWithBase64)
}