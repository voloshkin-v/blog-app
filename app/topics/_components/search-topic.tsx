'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Delete } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchTopic = () => {
    const [value, setValue] = useState('');
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            replace(pathname);
            return;
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleInput = (term: string) => {
        setValue(term);
        handleSearch(term);
    };

    const handleReset = () => {
        replace(pathname);
        setValue('');
    };

    return (
        <div className="relative">
            <Input
                id="search-form"
                placeholder="Search topic"
                className="text-ellipsis pr-10"
                value={value}
                onChange={(e) => handleInput(e.target.value)}
            />

            {value && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 hover:bg-transparent"
                    onClick={handleReset}
                >
                    <Delete className="w-4 transition-transform hover:scale-105" />
                </Button>
            )}
        </div>
    );
};
