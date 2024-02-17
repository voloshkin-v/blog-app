'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    {
        label: 'About',
        href: '/about',
    },
];

export const Nav = () => {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex items-center gap-4">
                {NAV_LINKS.map(({ href, label }, i) => (
                    <li key={i}>
                        <Link
                            href={href}
                            className={`text-muted-foreground transition-colors hover:text-foreground ${pathname === href ? 'active' : ''}`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
