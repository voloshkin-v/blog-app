import { notFound } from 'next/navigation';
import Link from 'next/link';
import { currentUser } from '@/lib/auth/current-user';
import { Suspense } from 'react';
import { getPosts } from '@/lib/db/queries/posts';

import { Button } from '@/components/ui/button';
import { PostsSkeleton } from '@/components/posts/posts-skeleton';
import { PostList } from '@/components/posts/post-list';
import { getAuthorById } from '@/lib/db/queries/author';

const AuthorPage = async ({ params: { id } }: { params: { id: string } }) => {
    const author = await getAuthorById(id);
    const user = await currentUser();

    if (!author) {
        notFound();
    }

    return (
        <>
            <h1 className="mb-10">{author.name}</h1>

            {user?.id === author.id ? (
                <Button asChild>
                    <Link href="/posts">Explore all posts</Link>
                </Button>
            ) : (
                <Suspense fallback={<PostsSkeleton />}>
                    <PostList fetchData={() => getPosts(id)} />
                </Suspense>
            )}
        </>
    );
};

export default AuthorPage;
