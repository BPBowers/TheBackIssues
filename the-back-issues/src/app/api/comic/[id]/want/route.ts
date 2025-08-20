//API route for userWants relation toggle

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
  
  

  // Check if already wants
  const existing = await prisma.userWants.findUnique({
    where: { userId_comicBookId: { userId, comicBookId: comicId } },
  })

  if (existing) {
    await prisma.userWants.delete({
      where: { userId_comicBookId: { userId, comicBookId: comicId } },
    })
    return NextResponse.json({ wants: false })
  } else {
    await prisma.userWants.create({
      data: { userId, comicBookId: comicId },
    })
    return NextResponse.json({ wants: true })
  }
}