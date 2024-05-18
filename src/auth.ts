import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";

interface User {
    username: String,
    password: String
}

export const { handlers, signIn, auth, signOut, unstable_update } = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },
            authorize: async (credentials) => {
                const { username, password } = credentials as { username: string, password: string }          
                const user = await db.user.findUnique({ where: { username }, select: { username: true, image: true, id: true, password: true } })
                
                return { name: user?.username, image: user?.image, hashPassword: user?.password }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({ token, session, trigger, user }) => {
            console.log('jwt callback', { token, session, user });

            if (user) {
                return {
                    ...token,
                }
            }
            return token
        },
        session: async ({ token, session, user }) => {
            console.log('session callback', { token, session, user });
            return {
                ...session,
                user: {
                    ...session.user,
                }
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})