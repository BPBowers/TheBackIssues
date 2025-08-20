// API route that returns the current status of userWants and userOwns for a specific comic

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET Function
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const comicId = parseInt(id, 10)

  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  const checkWants = await prisma.userWants.findUnique({
    where: { userId_comicBookId: { userId, comicBookId: comicId } },
  })

  const checkOwns = await prisma.userOwns.findUnique({
    where: { userId_comicBookId: { userId, comicBookId: comicId } },
  })

  return NextResponse.json({
    wants: !!checkWants,
    owns: !!checkOwns,
  })
}