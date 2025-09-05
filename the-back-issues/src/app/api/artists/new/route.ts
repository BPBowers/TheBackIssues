// src/app/api/artists/new/route.tsx
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { firstName, middleName, lastName, profilePic } = await req.json()
        const artist = await prisma.artist.create({
            data: { firstName, middleName, lastName, ProfilePic: profilePic },
        })
        return NextResponse.json(artist, {status: 201})
    } catch (error) {
        console.error(error)
            return NextResponse.json({ error: 'Failed to add Artist' }, {status: 500})
    }
}
