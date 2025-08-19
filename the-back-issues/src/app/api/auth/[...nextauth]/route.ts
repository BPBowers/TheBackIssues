// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "database", // or "jwt"
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          username: user.name ?? undefined,
          image: user.image ?? undefined,
        },
        create: {
          email: user.email,
          username: user.name ?? undefined,
          image: user.image ?? undefined,
        },
      })

      return true
    },

    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        })

        if (dbUser) {
          session.user.id = dbUser.id
        }
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }