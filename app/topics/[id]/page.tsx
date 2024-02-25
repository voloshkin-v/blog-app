import { notFound } from 'next/navigation';
import pluralize from 'pluralize';
import Link from 'next/link';
import { topicsService } from '@/lib/services/topics';

import { PostList } from '@/components/posts/post-list';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '../_components/section-header';

const TagPage = async ({ params: { id } }: { params: { id: string } }) => {
    const query = await topicsService.findById(id);

    if (!query) {
        notFound();
    }

    return (
        <>
            <SectionHeader title={query.name}>
                <div className="flex flex-col gap-4">
                    <div>
                        Topic · <span>{pluralize('post', query.posts.length, true)}</span>
                    </div>

                    <Button variant="link" asChild>
                        <Link href="/topics">Back to all topics</Link>
                    </Button>
                </div>
            </SectionHeader>

            <div className="py">
                <PostList posts={query.posts} />
            </div>
        </>
    );
};

export default TagPage;
