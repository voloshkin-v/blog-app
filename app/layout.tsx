import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';

import { Header } from '@/components/header';

const fredoka = Fredoka({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Blog app',
    description: 'Blog app',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body className={fredoka.className}>
                <SessionProvider session={session}>
                    <Header />

                    <div className="container h-full px-24 pt-8">{children}</div>
                </SessionProvider>
            </body>
        </html>
    );
}
