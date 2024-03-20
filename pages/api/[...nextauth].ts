import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";

export default NextAuth({
    providers: [
        Credentials({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: 'text',
                },
                password: {
                    label: "Password",
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email or password required');
                }

                const user = await prismadb
            }
        })
    ]
})
