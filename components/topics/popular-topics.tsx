import { Suspense } from 'react';
import Link from 'next/link';
import { topicsService } from '@/lib/services/topics';

import { TopicItem } from '@/components/topics/topic-item';
import { Tooltip } from '@/components/shared/tooltip';
import { Loader } from '@/components/shared/loader';
import { Skeleton } from '../ui/skeleton';

export const PopularTopics = async () => {
    return (
        <Suspense
            fallback={
                <div className="space-y-4">
                    <Skeleton className="h-9 max-w-40" />

                    <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 8 }, (item, i) => (
                            <Skeleton key={i} className="h-9 w-24" />
                        ))}
                    </div>

                    <Skeleton className="h-6 max-w-16" />
                </div>
            }
        >
            <PopularTopicsList />
        </Suspense>
    );
};

export const PopularTopicsList = async () => {
    const popularTopics = await topicsService.findPopular(8);

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
