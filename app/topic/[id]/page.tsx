import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import pluralize from 'pluralize';

const TagPage = async ({ params: { id } }: { params: { id: string } }) => {
    const tag = await prisma.topic.findUnique({
        where: { id },
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });

    if (!tag) {
        notFound();
    }

    return (
        <div>
            <div className="text-center">
                <h1>{tag.name}</h1>

                <div className="mt-4 text-muted-foreground">
                    Topic · <span>{pluralize('post', tag._count.posts, true)}</span>
                </div>
            </div>

            <div>Topic related posts list</div>
        </div>
    );
};

export default TagPage;
