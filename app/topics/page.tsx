import { topicsService } from '@/lib/services/topics';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import { SearchTopic } from '@/app/topics/_components/search-topic';
import { TopicList } from '@/app/topics/_components/topic-list';
import { LoadTopicsButton } from '@/app/topics/_components/load-topics-button';
import { SectionHeader } from '@/components/shared/section-header';

interface TopicsPage {
    searchParams: {
        query?: string;
        page?: string;
    };
}

const TopicsPage = async ({ searchParams }: TopicsPage) => {
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1;
    const validatedPage = page > 0 ? page : 1;
    const totalPage = await topicsService.getCount(query);

    return (
        <>
            <SectionHeader title="Explore all topics" />

            <div className="relative mx-auto mt-8 max-w-4xl space-y-8 md:mt-16 md:space-y-16">
                <SearchTopic />

                <div>
                    <Suspense
                        key={query + validatedPage}
                        fallback={
                            <div>
                                <Loader className="mx-auto animate-spin" />
                            </div>
                        }
                    >
                        <TopicList query={query} page={validatedPage} />

                        {validatedPage && totalPage > validatedPage && (
                            <div className="mt-2 flex justify-center">
                                <LoadTopicsButton page={validatedPage} />
                            </div>
                        )}
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default TopicsPage;
