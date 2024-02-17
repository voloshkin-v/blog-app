import Link from 'next/link';
import { prisma } from '@/lib/db';

import { ProfileImage } from '@/components/author/profile-image';
import { Button } from '../ui/button';
import { currentUser } from '@/lib/session';

export const PostList = async () => {
    const user = await currentUser();

    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
            topics: true,
        },
    });

    if (!posts.length) {
        return <p>There are no posts</p>;
    }

    return (
        <div className="space-y-12">
            {posts.map((post) => (
                <article key={post.id} className="flex items-center gap-10">
                    <div className="space-y-4">
                        <div className="row">
                            <Link href={`##`} className="row hover:underline">
                                <ProfileImage
                                    src={post.author.image}
                                    alt={`${post.author.name}'s profile picture`}
                                    classNames="w-6 h-6"
                                />

                                <span className="text-sm">{post.author.name}</span>
                            </Link>

                            <span>·</span>

                            <span className="text-xs text-muted-foreground">{post.createdAt.toDateString()}</span>
                        </div>

                        <div>
                            <Link href={`/posts/${post.id}`}>
                                <h3 className="text-xl font-medium">{post.title}</h3>
                                <p className="mt-1">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, et. Saepe
                                    necessitatibus quod dolorem neque temporibus, iure magnam, iste, laboriosam
                                    veritatis ab ea provident quis eum facilis harum alias consequuntur.
                                </p>
                            </Link>
                        </div>

                        <div>
                            <ul className="flex flex-wrap gap-2">
                                {post.topics.map((topic) => (
                                    <Button key={topic.id} variant="secondary" size="sm" asChild>
                                        <Link href={topic.slug}>{topic.name}</Link>
                                    </Button>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>Image</div>
                </article>
            ))}
        </div>
    );
};
