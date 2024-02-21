'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

interface Props {
    href: string;
    children: React.ReactNode;
}

export const Link = ({ href, children }: Props) => {
    const pathname = usePathname();

    return (
        <NextLink
            href={href}
            className={`hover:active flex items-center gap-2 text-muted-foreground transition-colors ${pathname === href ? 'active' : ''}`}
        >
            {children}
        </NextLink>
    );
};
