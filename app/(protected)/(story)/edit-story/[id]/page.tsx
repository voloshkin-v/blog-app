import { prisma } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { CreateEditForm } from '../../_components/create-edit-form';
import { postsService } from '@/lib/services/posts';
import { currentUser } from '@/lib/session';
import { HOME_PAGE } from '@/lib/constants/route';

const EditStoryPage = async ({ params: { id } }: { params: { id: string } }) => {
    const story = await postsService.findOne(id);
    const user = await currentUser();

    if (!user) {
        redirect(HOME_PAGE);
    }

    if (!story) {
        notFound();
    }

    return <CreateEditForm story={story} />;
};

export default EditStoryPage;
