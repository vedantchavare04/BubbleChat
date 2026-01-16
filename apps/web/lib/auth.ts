import type { NextAuthOptions } from "next-auth";
import { prisma } from "@repo/db";
import GoogleProvider from "next-auth/providers/google";

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
  async jwt({ token, user }) {
    if (user?.email) {
      // just store info in token — NO PRISMA HERE
      token.email = user.email;
      token.name = user.name;
    }
    return token;
  },

  async session({ session, token }) {
    if (token?.email) {
      session.user = {
        ...session.user,
        email: token.email as string,
        name: token.name as string,
      };
    }
    return session;
  },
},


  secret: process.env.NEXTAUTH_SECRET,
};
