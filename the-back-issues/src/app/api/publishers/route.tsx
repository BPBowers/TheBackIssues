// ROUTE: src/app/api/publishers/route.tsx

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    const publishers = await prisma.publisher.findMany({
        orderBy: { name: 'asc' },
        });
    return NextResponse.json(publishers);
}