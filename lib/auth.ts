import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "name" },
      },
      async authorize(credentials: any) {
        const { email, password, name } = credentials;
        console.log("Authorize called with:", credentials);

        // 🔍 Check if user exists
        const user = await prisma.user.findFirst({
          where: { email },
        });

        // 🆕 Create new user if not found
        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          };
        }

        // 🔐 Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin", // custom sign-in page
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ user, token }: any) {
      if (user) token.uid = user.id;
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) session.user.id = token.uid;
      return session;
    },
  },
};


export default NEXT_AUTH_CONFIG;