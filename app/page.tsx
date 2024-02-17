import Link from 'next/link';
import { prisma } from '@/lib/db';

import { PostList } from '@/components/posts/post-list';
import { PopularTopics } from '@/components/topics/popular-topics';

export default async function Home() {
    return (
        <div className="flex h-full gap-20">
            <main className="basis-2/3">
                <PostList />
            </main>

            <aside className="sidebar">
                <PopularTopics />
            </aside>
        </div>
    );
}
