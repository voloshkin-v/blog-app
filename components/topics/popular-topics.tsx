import { prisma } from '@/lib/db';
import { TopicItem } from '@/components/topics/topic-item';
import Link from 'next/link';
import { Tooltip } from '../shared/tooltip';

export const PopularTopics = async () => {
    const popularTopics = await prisma.topic.findMany({
        take: 8,
    });

    if (!popularTopics.length) return null;

    return (
        <div className="space-y-4">
            <h2 className="row">
                Popular topics
                <Tooltip>These topics have the largest number of posts</Tooltip>
            </h2>

            <div className="flex flex-wrap gap-4">
                {popularTopics.map((topic) => (
                    <TopicItem key={topic.id} topic={topic} />
                ))}
            </div>
        </div>
    );
};
