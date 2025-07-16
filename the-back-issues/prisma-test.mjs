import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const comics = await prisma.comicBook.findMany()
console.log(comics)