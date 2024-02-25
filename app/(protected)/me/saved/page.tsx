import { postsService } from '@/lib/services/posts';
import { currentUser } from '@/lib/session';

import { PostList } from '@/components/posts/post-list';

const SavedPage = async () => {
    const user = await currentUser();
    const savedPosts = await postsService.findSaved(user?.id || '');

    return (
        <>
            <h1 className="mb-10 border-b pb-10">Saved posts</h1>

            <div>{savedPosts.length ? <PostList posts={savedPosts} /> : <p>You have not saved posts yet.</p>}</div>
        </>
    );
};

export default SavedPage;
