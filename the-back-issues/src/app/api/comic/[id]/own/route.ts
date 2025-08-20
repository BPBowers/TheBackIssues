//API route for userOwns relation toggle

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const comicId = parseInt(id, 10)
    
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const userId = session.user.id

  // Check if already owned
  const existing = await prisma.userOwns.findUnique({
    where: { userId_comicBookId: { userId, comicBookId: comicId } },
  })

  if (existing) {
    await prisma.userOwns.delete({
      where: { userId_comicBookId: { userId, comicBookId: comicId } },
    })
    return NextResponse.json({ owns: false })
  } else {
    await prisma.userOwns.create({
      data: { userId, comicBookId: comicId },
    })
    return NextResponse.json({ owns: true })
  }
}