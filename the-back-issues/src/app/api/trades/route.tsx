//app/api/trades/route.tsx
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

const prisma = new PrismaClient()

//Get all trades
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get("location")
    const wantComicId = searchParams.get("want")

    const trades = await prisma.tradePost.findMany({
        where: {
            ...(location ? { location: { contains: location } } : {}),
            ...(wantComicId ? { wants: { some: { comicBookId: Number(wantComicId)} } } : {}),
        },
        include: {
            offers: { include: { comicBook: true } },
            wants: {include: { comicBook: true } },
            user: { select: { id: true, name: true, image: true}},
        },
        orderBy: { createdAt: "desc"},
    });

    return NextResponse.json(trades);
}

//Post a new trade post
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { offers, wants, location, message, exactMatch } = body;

    const trade = await prisma.tradePost.create({
        data: {
            userId: session.user.id,
            location,
            message,
            exactMatch: exactMatch ?? true,
            offers: {
                create: offers.map((o: { comicBookId: number; quantity?: number }) => ({
                    comicBookId: o.comicBookId,
                    quantity: o.quantity ?? 1,
                })),
            },
            wants: {
                create: wants.map((w: { comicBookId: number; quantity?: number }) => ({
                    comicBookId: w.comicBookId,
                    quantity: w.quantity ?? 1,
                })),
            },
        },
        include: {
            offers: { include: { comicBook: true } },
            wants: { include: { comicBook: true } },
        },
    });

    return NextResponse.json(trade, {status: 201});
}