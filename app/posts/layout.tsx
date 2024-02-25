import { PopularTopics } from '@/components/topics/popular-topics';

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container flex flex-col gap-8 md:flex-row md:gap-16">
            <main className="py basis-2/3">{children}</main>

            <aside className="py basis-1/3 space-y-8 border-t md:space-y-16 md:border-l md:border-t-0 md:px-6">
                <div className="md:sticky md:top-16">
                    <PopularTopics />
                </div>
            </aside>
        </div>
    );
};

export default PostsLayout;
