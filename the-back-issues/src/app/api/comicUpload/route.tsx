//Comic Book Upload API Route

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { issue, frontCover, backCover, coverPrice, releaseDate, seriesID } = await req.json()

        if (!issue || !frontCover || !coverPrice || !seriesID) {
            return new Response(JSON.stringify({ error: 'Upload Fields are Absent'}), { status: 400 })
        }

        const newComicBook = await prisma.comicBook.create
        
        ({
            data: {
                issue, 
                frontCover, 
                backCover, 
                coverPrice, 
                releaseDate,
                seriesID,
            },
        })

        return new Response(JSON.stringify({ comicId: newComicBook.id }), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal server error '}), {status: 500})
    }
}