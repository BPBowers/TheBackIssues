// ROUTE: src/app/api/series/new/route.tsx

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { title, publisherId } = body;

  if (!title || !publisherId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

    const series = await prisma.series.create({
        data: {
            title,
            Publisher: {
                connect: { id: Number(publisherId)}
            }
        },
    });

  return NextResponse.json(series);
}