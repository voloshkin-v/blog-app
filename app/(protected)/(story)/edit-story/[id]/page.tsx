import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { CreateEditForm } from '../../_components/create-edit-form';

const EditStoryPage = async ({ params: { id } }: { params: { id: string } }) => {
    const story = await prisma.post.findUnique({
        where: { id },
    });

    if (!story) {
        notFound();
    }

    return <CreateEditForm story={story} />;
};

export default EditStoryPage;
