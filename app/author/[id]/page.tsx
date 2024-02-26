import { notFound } from 'next/navigation';
import { authorService } from '@/lib/services/author';
import Link from 'next/link';
import { currentUser } from '@/lib/session';
import { Button } from '@/components/ui/button';
import { AuthorPosts } from './_components/author-posts';
import { Suspense } from 'react';
import { Loader } from '@/components/shared/loader';

const AuthorPage = async ({ params: { id } }: { params: { id: string } }) => {
    const author = await authorService.findOne(id);
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
                <Suspense fallback={<Loader />}>
                    <AuthorPosts id={author.id} />
                </Suspense>
            )}
        </>
    );
};

export default AuthorPage;
