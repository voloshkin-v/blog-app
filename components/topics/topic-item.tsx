import { Topic } from '@prisma/client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface Props {
    topic: Topic;
    size?: 'default' | 'sm' | 'lg';
}

export const TopicItem = ({ topic, size = 'default' }: Props) => {
    return (
        <Button variant="secondary" size={size} asChild className="transition-transform hover:-translate-y-[1px]">
            <Link href={`/topics/${topic.id}`}>{topic.name}</Link>
        </Button>
    );
};
