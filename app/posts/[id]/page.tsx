import { postsService } from '@/lib/services/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AuthorImage } from '@/components/author/author-image';
import { SavePostButton } from '@/components/posts/save-post-button';

const PostPage = async ({ params: { id } }: { params: { id: string } }) => {
    const post = await postsService.findOne(id);

    if (!post) {
        notFound();
    }

    return (
        <section className="py m-auto max-w-4xl">
            <h1>{post?.title}</h1>

            <p className="mt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum ipsum aut quos dolore ad rerum blanditiis
                accusamus ducimus! Fugit placeat tempora similique sapiente laudantium, optio totam nam ex dolorum quos!
            </p>

            <div className="my-4 space-y-2">
                <Link href={`/author/${post.authorId}`} className="row hover:underline">
                    <AuthorImage src={post.author.image || ''} />
                    <span>{post.author.name}</span>
                </Link>

                <p>Created: {post.createdAt.toDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-4 border-b border-t py-2">
                <span>clap</span>
                <span>comment</span>

                <SavePostButton postId={post.id} savedByUser={post.savedByUser} />
            </div>

            <div className="mt-8">content</div>
        </section>
    );
};

export default PostPage;
