import type { Post } from '@/lib/db/types';

import { PostItemRow } from '@/components/posts/post-item-row';

interface Props {
    fetchData: () => Promise<Post[]>;
    noFoundPostMessage?: string;
}

export const PostList = async ({ fetchData, noFoundPostMessage }: Props) => {
    const posts = await fetchData();

    if (!posts.length) {
        return <p>{noFoundPostMessage || 'No posts found'}</p>;
    }

    return (
        <div className="space-y-12">
            {posts.map((post) => (
                <PostItemRow key={post.id} post={post} />
            ))}
        </div>
    );
};
