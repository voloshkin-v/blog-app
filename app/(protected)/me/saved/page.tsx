import { postsService } from '@/lib/services/posts';
import { currentUser } from '@/lib/session';

import { PostList } from '@/components/posts/post-list';

const SavedPage = async () => {
    const user = await currentUser();
    const savedPosts = await postsService.findSaved(user?.id || '');

    return (
        <>
            <div className="mb-8 flex flex-wrap justify-between gap-4 border-b pb-8">
                <h1>Saved posts</h1>
            </div>

            <div>{savedPosts.length ? <PostList posts={savedPosts} /> : <p>You have not saved posts yet.</p>}</div>
        </>
    );
};

export default SavedPage;
