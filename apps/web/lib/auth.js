import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.email) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.email) {
                session.user = {
                    ...session.user,
                    email: token.email,
                    name: token.name,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
