import { notFound, redirect } from 'next/navigation';
import { CreateEditForm } from '../../_components/create-edit-form';
import { currentUser } from '@/lib/auth/current-user';
import { HOME_PAGE } from '@/lib/constants/route';
import { getPostById } from '@/lib/db/queries/posts';

const EditStoryPage = async ({ params: { id } }: { params: { id: string } }) => {
    const story = await getPostById(id);
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
