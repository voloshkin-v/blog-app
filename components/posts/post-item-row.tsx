import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/components/posts/types';

import { AuthorImage } from '@/components/author/author-image';
import { TopicItem } from '@/components/topics/topic-item';
import { SavePostButton } from '@/components/posts/save-post-button';

interface Props {
    post: Post;
}

export const PostItemRow = async ({ post }: Props) => {
    return (
        <article className="space-y-2">
            <div className="row">
                <Link href={`/author/${post.authorId}`} className="row hover:underline">
                    <AuthorImage src={post.author.image || ''} className="h-6 w-6" />
                    <span className="text-sm">{post.author.name}</span>
                </Link>

                <span>·</span>

                <span className="text-xs text-muted-foreground">{post.createdAt.toDateString()}</span>
            </div>

            <div className="flex flex-col justify-between gap-2 md:flex-row">
                <Link href={`/posts/${post.id}`} className="block flex-1 space-y-1">
                    <h3 className="text-xl font-medium">{post.title}</h3>
                    <p>{post.preview}</p>
                </Link>

                <Link href={`/posts/${post.id}`} className="inline-block w-fit overflow-hidden rounded md:m-auto">
                    {post.image && (
                        <Image
                            className="transition-transform hover:scale-105"
                            src={post.image}
                            alt="Post image"
                            width={200}
                            height={200}
                        />
                    )}
                </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
                {post.topics.length > 0 && (
                    <div className="flex basis-full flex-wrap gap-2">
                        {post.topics.map((topic) => (
                            <TopicItem key={topic.id} topic={topic} size="sm" />
                        ))}
                    </div>
                )}

                <span className="text-xs text-muted-foreground">5 mins read</span>

                <SavePostButton postId={post.id} savedByUser={post.savedByUser} />
            </div>
        </article>
    );
};
