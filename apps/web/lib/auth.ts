import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@repo/db"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      await prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: {
          email: user.email,
          name: user.name ?? user.email.split("@")[0],
        },
      })

      return true
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
