'use client';

import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AddPostLink = () => {
    const pathname = usePathname();

    return (
        <Link
            href="/new-story"
            className={`hover:active flex items-center gap-2 text-muted-foreground transition-colors ${pathname === '/new-story' ? 'active' : ''}`}
        >
            Write <SquarePen className="w-4" />
        </Link>
    );
};
