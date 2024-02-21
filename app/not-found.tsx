import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="py container flex flex-col items-center gap-4">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>

            <Button asChild>
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
