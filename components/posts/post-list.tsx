import { PostItemRow } from '@/components/posts/post-item-row';
import { Post } from '@/components/posts/types';

interface Props {
    posts: Post[];
}

export const PostList = async ({ posts }: Props) => {
    if (!posts.length) {
        return <p className="text-center">There are no posts yet</p>;
    }

    return (
        <div className="space-y-12">
            {posts.map((post) => (
                <PostItemRow key={post.id} post={post} />
            ))}
        </div>
    );
};
