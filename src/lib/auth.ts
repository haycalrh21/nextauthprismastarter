import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import NextAuth from "next-auth";

// Mendeklarasikan properti `username` di tipe `User` dan `Session`

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/sign-in",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existUser = await db.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!existUser) {
					return null;
				}

				const passwordMatch = await compare(
					credentials?.password,
					existUser.password
				);

				if (!passwordMatch) {
					return null;
				}

				return {
					id: existUser.id + "", // Mengonversi id ke string
					username: existUser.username,
					email: existUser.email,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user && "username" in user) {
				return {
					...token,
					username: user.username,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
				},
			};
		},
	},
};
