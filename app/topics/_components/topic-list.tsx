import { TopicItem } from '@/components/topics/topic-item';
import { getTopics } from '@/lib/db/queries/topics';

interface Props {
    query: string;
    page: number;
}

export const TopicList = async ({ query, page }: Props) => {
    const { topics } = await getTopics(query, page);

    if (!topics.length && query) {
        return (
            <div>
                <p>Make sure all words are spelled correctly.</p>
                <p>Try different keywords.</p>
                <p>Try more general keywords.</p>
            </div>
        );
    }

    if (!topics.length) {
        return <p>No topics found</p>;
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
