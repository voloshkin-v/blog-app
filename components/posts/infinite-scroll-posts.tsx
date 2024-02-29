'use client';

import { useInView } from 'react-intersection-observer';

import { Loader } from '@/components/shared/loader';
import { useEffect, useState } from 'react';
import { Post } from '@/lib/db/types';
import { fetchPosts } from '@/actions/post/get-posts';
import { PostItemRow } from './post-item-row';

export const InfiniteScrollPosts = () => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);

    const { ref, inView } = useInView();

    useEffect(() => {
        const loadMorePosts = async () => {
            const nextPage = page + 1;
            const posts = await fetchPosts(nextPage);

            if (!posts.length) {
                return;
            }

            setPosts((prev) => [...prev, ...posts]);
            setPage(nextPage);
        };

        if (inView) {
            loadMorePosts();
        }
    }, [inView, page]);

    return (
        <div>
            <div className="space-y-12">
                {posts.map((post) => (
                    <PostItemRow key={post.id} post={post} />
                ))}
            </div>

            <div ref={ref} className="flex justify-center py-2">
                <Loader />
            </div>
        </div>
    );
};
