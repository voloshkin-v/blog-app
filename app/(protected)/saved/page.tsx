import { PostList } from '@/components/posts/post-list';
import { SectionHeader } from '@/components/shared/section-header';
import { prisma } from '@/lib/db';
import { postsService } from '@/lib/services/posts';
import { currentUser } from '@/lib/session';

const SavedPage = async () => {
    const user = await currentUser();
    const savedPosts = await postsService.findSaved(user?.id || '');

    if (!savedPosts) {
        return <p>There are no saved posts</p>;
    }

    return (
        <section className="py container-small">
            <SectionHeader title="Saved posts" />

            <div className="mt-8 md:mt-16">
                <PostList posts={savedPosts} />
            </div>
        </section>
    );
};

export default SavedPage;
