import { prisma } from '@/lib/db';
import Link from 'next/link';
import { EyeOpenIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

export const Topics = async () => {
    const topics = await prisma.topic.findMany({
        take: 8,
    });

    return (
        <div className="space-y-4">
            <h2>Popular topics</h2>

            <ul className="grid grid-cols-4 gap-4">
                {topics.map((topic) => (
                    <li key={topic.id}>
                        <Button asChild variant="outline" className="h-auto w-full p-4">
                            <Link href={`/topic/${topic.id}`}>
                                <span>{topic.name}</span>
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>

            <Button className="inline-flex items-center justify-start gap-2 p-0" variant="link" asChild>
                <Link href="/posts">
                    Explore more <EyeOpenIcon />
                </Link>
            </Button>
        </div>
    );
};
