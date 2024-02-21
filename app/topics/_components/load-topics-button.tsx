'use client';

import { ArrowDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

export const LoadTopicsButton = ({ page }: { page: number }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleLoadMore = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', `${page + 1}`);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Button variant="link" className="hover:no-underline" onClick={handleLoadMore}>
            Show more <ArrowDown />
        </Button>
    );
};
