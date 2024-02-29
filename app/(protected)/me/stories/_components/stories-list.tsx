import { currentUser } from '@/lib/auth/current-user';
import { getPublishedPosts } from '@/lib/db/queries/posts';

import { Story } from './story-item';

export const StoriesList = async () => {
    const user = await currentUser();
    const published = await getPublishedPosts(user?.id || '');

    if (!published.length) {
        return <p>You have not published any public stories yet.</p>;
    }

    return (
        <div>
            {published.map((story) => (
                <Story key={story.id} story={story} />
            ))}
        </div>
    );
};
