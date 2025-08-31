//src/app/api/trades/[id]/counter/route.tsx
import {NextResponse} from 'next/server'
import { getServerSession} from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '../../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

//Add counter offer
export async function POST(
    req: Request,
    {params}: { params: {id: string}}
) {
    const session = await getServerSession(authOptions);
    if(!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized Access"}, {status: 401})
    }

    const body = await req.json()
    const {offers, wants, message} = body;

    const counter = await prisma.counterOffer.create({
        data: {
            tradePostId: Number(params.id),
            userId: session.user.id,
            message,
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

  return NextResponse.json(counter, { status: 201 });
}
