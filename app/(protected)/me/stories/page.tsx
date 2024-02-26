import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { StoriesList } from './_components/stories-list';
import { Suspense } from 'react';
import { Loader } from '@/components/shared/loader';

const StoriesPage = () => {
    return (
        <>
            <div className="mb-8 flex flex-wrap justify-between gap-4 border-b pb-8">
                <h1>Your stories</h1>

                <Button asChild>
                    <Link href="/new-story">Write a story</Link>
                </Button>
            </div>

            <StoriesList />
        </>
    );
};

export default StoriesPage;
