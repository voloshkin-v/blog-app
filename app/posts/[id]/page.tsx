import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCleanHtml } from '@/lib/utils';
import { getPostById } from '@/lib/db/queries/posts';

import { AuthorImage } from '@/components/author/author-image';
import { SavePostButton } from '@/components/posts/save-post-button';
import { PostImage } from '@/components/posts/post-image';
import { Button } from '@/components/ui/button';
import { LikePostButton } from '@/components/posts/like-post-button';

const PostPage = async ({ params: { id } }: { params: { id: string } }) => {
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="container-small py">
            <div className="space-y-4">
                <h1>{post.title}</h1>
                <p>{post.preview}</p>
            </div>

            <div className="my-4 space-y-4">
                <Link href={`/author/${post.authorId}`} className="row hover:underline">
                    <AuthorImage src={post.author.image || ''} />
                    <span>{post.author.name}</span>
                </Link>

                <p>Published {post.createdAt.toDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-4 border-b border-t py-2">
                <SavePostButton postId={post.id} savedByUser={post.savedByUser} />
                <LikePostButton postId={post.id} likedByUser={post.likes} />

                <Button variant={'secondary'}>Comment</Button>
            </div>

            <div className="mt-8 space-y-8">
                {post.image && <PostImage src={post.image} parentClassName="pb-[45%] h-auto w-full max-w-full" />}
                <div dangerouslySetInnerHTML={{ __html: getCleanHtml(post.content) }} />
            </div>
        </div>
    );
};

export default PostPage;
