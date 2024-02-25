import { topicsService } from '@/lib/services/topics';

import { SearchTopic } from '@/app/topics/_components/search-topic';
import { TopicList } from '@/app/topics/_components/topic-list';
import { SectionHeader } from './_components/section-header';
import { LoadTopicsButton } from './_components/load-topics-button';

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
                    <TopicList query={query} page={validatedPage} />

                    {totalPage > validatedPage && (
                        <div className="mt-2 flex justify-center">
                            <LoadTopicsButton page={validatedPage} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TopicsPage;
