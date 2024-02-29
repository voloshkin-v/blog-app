'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
    href: string;
    children: React.ReactNode;
}

export const NavLink = ({ href, children }: Props) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={`hover:active flex items-center gap-2 text-muted-foreground transition-colors ${pathname === href ? 'active' : ''}`}
        >
            {children}
        </Link>
    );
};
