// ROUTE: src/app/api/series/route.tsx

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
  const series = await prisma.series.findMany({
    include: { Publisher: true },
    orderBy: { title: 'asc' },
  });
  return NextResponse.json(series);
}