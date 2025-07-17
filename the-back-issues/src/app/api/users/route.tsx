//User API Route

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        if (!username || !password) {
            return new Response(JSON.stringify({ error: 'Username or Password Missing'}), { status: 400 })
        }

        const existingUser = await prisma.users.findUnique({ where: { username } })
        
        if(existingUser) {
            return new Response(JSON.stringify({ error: 'Username already exists, try again'}), { status: 409})
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await prisma.users.create
        
        ({
            data: {
                username,
                passwordHash,
            },
        })

        return new Response(JSON.stringify({ userId: newUser.id }), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: 'Internal server error '}), {status: 500})
    }
}