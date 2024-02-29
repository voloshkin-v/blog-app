import { Suspense } from 'react';
import Link from 'next/link';
import { getPopularTopics } from '@/lib/db/queries/topics';

import { TopicItem } from '@/components/topics/topic-item';
import { Tooltip } from '@/components/shared/tooltip';
import { TopicsSkeleton } from './topics-skeleton';

export const PopularTopics = async () => {
    return (
        <Suspense fallback={<TopicsSkeleton />}>
            <PopularTopicsList />
        </Suspense>
    );
};

export const PopularTopicsList = async () => {
    const popularTopics = await getPopularTopics();

    return (
        <div className="space-y-4">
            <h2 className="row">
                Popular topics
                <Tooltip>These topics have the largest number of posts</Tooltip>
            </h2>

            {popularTopics.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {popularTopics.map((topic) => (
                        <TopicItem key={topic.id} topic={topic} />
                    ))}
                </div>
            ) : (
                <p>No topics found</p>
            )}

            <Link href="/topics" className="link-underline inline-block">
                Explore all
            </Link>
        </div>
    );
};
