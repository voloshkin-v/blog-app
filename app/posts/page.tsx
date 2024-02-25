import { PostList } from '@/components/posts/post-list';
import { postsService } from '@/lib/services/posts';

const PostsPage = async () => {
    const posts = await postsService.findAll();

    return <PostList posts={posts} />;
};

export default PostsPage;
