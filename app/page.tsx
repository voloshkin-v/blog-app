import Link from 'next/link';
import { prisma } from '@/lib/db';

import { PostList } from '@/components/posts/post-list';

export default async function Home() {
    return (
        <div className="flex h-full gap-20">
            <main className="basis-2/3">
                <PostList />
            </main>

            <aside className="-mt-8 flex-1 border-l bg-red-50 pt-8">
                <div>
                    <h2>Popular topics</h2>

                    <ul>
                        <li>
                            <Link href="##">Topic 1</Link>
                        </li>

                        <li>
                            <Link href="##">Topic 1</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
