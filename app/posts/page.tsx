import { getPopularPosts } from '@/lib/db/queries/posts';
import { Suspense } from 'react';

import { PostList } from '@/components/posts/post-list';
import { SidebarLayout } from '@/components/sidebar-layout';
import { PopularTopics } from '@/components/topics/popular-topics';
import { PostsSkeleton } from '@/components/posts/posts-skeleton';

import { fetchPosts } from '@/actions/post/get-posts';
import { InfiniteScrollPosts } from '@/components/posts/infinite-scroll-posts';

const PostsPage = async () => {
    return (
        <SidebarLayout sidebar={<PopularTopics />}>
            <Suspense fallback={<PostsSkeleton />}>
                <div className="space-y-12">
                    <PostList fetchData={fetchPosts} />
                </div>
            </Suspense>
        </SidebarLayout>
    );
};

export default PostsPage;
