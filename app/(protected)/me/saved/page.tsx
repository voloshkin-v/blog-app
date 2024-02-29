import { currentUser } from '@/lib/auth/current-user';
import { Suspense } from 'react';
import { getSavedPosts } from '@/lib/db/queries/posts';

import { PostList } from '@/components/posts/post-list';
import { PostsSkeleton } from '@/components/posts/posts-skeleton';

const SavedPage = async () => {
    const user = await currentUser();

    return (
        <>
            <div className="mb-8 flex flex-wrap justify-between gap-4 border-b pb-8">
                <h1>Saved posts</h1>
            </div>

            <Suspense fallback={<PostsSkeleton />}>
                <PostList
                    fetchData={() => getSavedPosts(user?.id || '')}
                    noFoundPostMessage="You have not saved posts yet."
                />
            </Suspense>
        </>
    );
};

export default SavedPage;
