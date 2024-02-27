import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: '/',
        error: '/',
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    callbacks: {
        session: ({ session, token }) => {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        jwt: ({ token }) => {
            return token;
        },
    },
    ...authConfig,
});
