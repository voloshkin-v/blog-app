import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import '@/app/globals.css';

import { AuthSession } from '@/lib/auth/auth-session';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header/header';

export const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' });

export const metadata: Metadata = {
    title: 'Blog app',
    description: 'Blog app',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={fredoka.className}>
                <AuthSession>
                    <Header />

                    <div className="h-full pt-16">{children}</div>
                    <Toaster />
                </AuthSession>
            </body>
        </html>
    );
}
