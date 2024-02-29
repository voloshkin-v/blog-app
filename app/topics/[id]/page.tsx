import { notFound } from 'next/navigation';
import pluralize from 'pluralize';
import Link from 'next/link';
import { getPostsByTopicId } from '@/lib/db/queries/posts';
import { getTopicById } from '@/lib/db/queries/topics';

import { PostList } from '@/components/posts/post-list';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '../_components/section-header';

const TagPage = async ({ params: { id } }: { params: { id: string } }) => {
    const tag = await getTopicById(id);

    if (!tag) {
        notFound();
    }

    return (
        <>
            <SectionHeader title={tag.name}>
                <div className="flex flex-col gap-4">
                    <Button variant="link" asChild>
                        <Link href="/topics">Back to all topics</Link>
                    </Button>
                </div>
            </SectionHeader>

            <div className="py">
                <PostList fetchData={() => getPostsByTopicId(id)} />
            </div>
        </>
    );
};

export default TagPage;
