'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="py container flex flex-col items-center gap-4">
            <h2>Ooops, something went wrond</h2>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
