import { getUserByEmail } from "@/data/user";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  //@ts-ignore;
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await getUserByEmail(credentials.email);

        if (!user) {
          return null;
        }
        const isCorrectPassword = await compare(
          credentials.password,
          user.password as string
        );

        if (!isCorrectPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          role: "USER",
        };
      }
      return token;
    },
  },
};
