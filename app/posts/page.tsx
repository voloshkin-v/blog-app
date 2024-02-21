import { prisma } from '@/lib/db';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import { PostList } from '@/components/posts/post-list';
import { SidebarLayout } from '@/components/shared/sidebar-layout';
import { PopularTopics } from '@/components/topics/popular-topics';
import { postsService } from '@/lib/services/posts';

const PostsPage = async () => {
    const posts = await postsService.findAll();

    return (
        <SidebarLayout
            sidebar={
                <Suspense
                    fallback={
                        <div className="row">
                            Loading...
                            <Loader className="animate-spin-slow" />
                        </div>
                    }
                >
                    <PopularTopics />
                </Suspense>
            }
        >
            <PostList posts={posts} />
        </SidebarLayout>
    );
};

export default PostsPage;
