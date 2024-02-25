import { Suspense } from 'react';
import Link from 'next/link';
import { topicsService } from '@/lib/services/topics';

import { TopicItem } from '@/components/topics/topic-item';
import { Tooltip } from '@/components/shared/tooltip';
import { Loader } from '@/components/shared/loader';
import { Skeleton } from '../ui/skeleton';

export const PopularTopics = async () => {
    return (
        <Suspense fallback={<Loader>Loading popular topics</Loader>}>
            <PopularTopicsList />
        </Suspense>
    );
};

export const PopularTopicsList = async () => {
    const popularTopics = await topicsService.findPopular(8);
    if (!popularTopics.length) return false;

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

            <Link href="/topics" className="link-underline inline-block">
                Explore all
            </Link>
        </div>
    );
};
