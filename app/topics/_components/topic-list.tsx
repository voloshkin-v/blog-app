import { topicsService } from '@/lib/services/topics';

import { TopicItem } from '@/components/topics/topic-item';

interface Props {
    query: string;
    page: number;
}

export const TopicList = async ({ query, page }: Props) => {
    const { topics } = await topicsService.findAll(query, page);

    if (!topics.length) {
        return (
            <div>
                <p>Make sure all words are spelled correctly.</p>
                <p>Try different keywords.</p>
                <p>Try more general keywords.</p>
            </div>
        );
    }

    return (
        <ul className="flex flex-wrap gap-2">
            {topics.map((topic) => (
                <li key={topic.id}>
                    <TopicItem topic={topic} />
                </li>
            ))}
        </ul>
    );
};
