import { prisma } from '@/lib/db';
import { currentUser } from '@/lib/session';
import { Story } from './story-item';

const findPublishedPosts = async (authorId: string) => {
    return await prisma.post.findMany({
        where: {
            authorId,
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const StoriesList = async () => {
    const user = await currentUser();
    const published = await findPublishedPosts(user?.id || '');

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
