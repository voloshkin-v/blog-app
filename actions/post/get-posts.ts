'use server';

import { getPopularPosts } from '@/lib/db/queries/posts';

export const fetchPosts = async (page: number = 1) => {
    const posts = await getPopularPosts(page);
    return posts;
};
