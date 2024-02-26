import { postsService } from '@/lib/services/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AuthorImage } from '@/components/author/author-image';
import { SavePostButton } from '@/components/posts/save-post-button';
import { getCleanHtml } from '@/lib/utils';
import { PostImage } from '@/components/posts/post-image';

const PostPage = async ({ params: { id } }: { params: { id: string } }) => {
    const post = await postsService.findOne(id);

    if (!post) {
        notFound();
    }

    return (
        <>
            <div className="space-y-2">
                <PostImage src={post.image} className="h-auto w-full max-w-full bg-gray-100 pb-[45%]" />

                <h1>{post.title}</h1>
                <p>{post.preview}</p>
            </div>

            <div className="my-4 space-y-2">
                <Link href={`/author/${post.authorId}`} className="row hover:underline">
                    <AuthorImage src={post.author.image || ''} />
                    <span>{post.author.name}</span>
                </Link>

                <p>Published {post.createdAt.toDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-4 border-b border-t py-2">
                <SavePostButton postId={post.id} savedByUser={post.savedByUser} />
            </div>

            <div className="mt-8" dangerouslySetInnerHTML={{ __html: getCleanHtml(post.content) }} />
        </>
    );
};

export default PostPage;
