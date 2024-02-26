import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CreateEditForm } from '../../_components/create-edit-form';
import { postsService } from '@/lib/services/posts';

const EditStoryPage = async ({ params: { id } }: { params: { id: string } }) => {
    const story = await postsService.findOne(id);

    if (!story) {
        notFound();
    }

    return <CreateEditForm story={story} />;
};

export default EditStoryPage;
