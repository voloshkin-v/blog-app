import { prisma } from '@/lib/db';

import { PostList } from '@/components/posts/post-list';
import { postsService } from '@/lib/services/posts';

export const AuthorPosts = async ({ id }: { id: string }) => {
    const posts = await postsService.findAll(id);
    return <PostList posts={posts} />;
};
