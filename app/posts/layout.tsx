import { SidebarLayout } from '@/components/sidebar-layout';
import { PopularTopics } from '@/components/topics/popular-topics';

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
    return <SidebarLayout sidebar={<PopularTopics />}>{children}</SidebarLayout>;
};

export default PostsLayout;
