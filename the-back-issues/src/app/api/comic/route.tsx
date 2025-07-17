//ComicBook API Route

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
  const comics = await prisma.comicBook.findMany({
    include: {
      Series: {
        select: {
          title: true,
        },
      },
    }
  });
  const comicWithBase64 = comics.map(comic => ({
    id: comic.id, issue: comic.issue,
    frontCover: comic.frontCover ? Buffer.from(comic.frontCover).toString('base64') : null,
    backCover: comic.backCover ? Buffer.from(comic.backCover).toString('base64') : null,
    coverPrice: comic.coverPrice, releaseDate: comic.releaseDate,
    seriesTitle: comic.Series?.title || 'Unknown Series',
  }));

  return Response.json(comicWithBase64)
}