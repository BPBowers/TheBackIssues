//app/api/trades/[id]/route.tsx
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authOptions } from '../../auth/[...nextauth]/route'

const prisma = new PrismaClient()

//Get Single Trade
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const trade = await prisma.tradePost.findUnique({
        where: { id: Number(params.id) },
        include: {
            offers: { include: { comicBook: true } },
            wants: { include: { comicBook: true } },
            counterOffers: {
                include: {
                    offers: { include: {comicBook: true } },
                    wants: {include: { comicBook: true } },
                    user: { select: { id: true, name: true, image: true } },
                },
            },
        },
    });
    if (!trade) return NextResponse.json({ error: "Not Found!" }, { status: 404 })
    return NextResponse.json(trade)
}
//Update A trade
export async function PATCH(
    req: Request,
    { params }: {params: {id: string}}
) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json()
    const { location, message, exactMatch} = body

    const trade = await prisma.tradePost.update({
        where: { id: Number(params.id), userId: session.user.id},
        data: { location, message, exactMatch},
    })
    return NextResponse.json(trade)
}
//Remove a trade
export async function DELETE(
    req: Request,
    {params}: {params: {id:string}}
){
    const session = await getServerSession(authOptions)
    if(!session?.user?.id) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    await prisma.tradePost.delete({
        where: { id: Number(params.id), userId: session.user.id},
    });

    return NextResponse.json({sucess: true})
}
