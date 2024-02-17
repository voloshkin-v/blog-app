import { Topic } from '@prisma/client';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
    topic: Topic;
    size?: 'default' | 'sm' | 'lg';
}

export const TopicItem = ({ topic, size = 'default' }: Props) => {
    return (
        <Button variant="secondary" size={size} asChild className="transition-transform hover:-translate-y-[1px]">
            <Link href={`/topic/${topic.id}`}>{topic.name}</Link>
        </Button>
    );
};
