import { notFound } from 'next/navigation';
import { authorService } from '@/lib/services/author';

import { SidebarLayout } from '@/components/sidebar-layout';
import { AuthorCard } from '@/app/author/[id]/_components/author-card';

interface Props {
    children: React.ReactNode;
    params: { id: string };
}

const AuthorLayout = async ({ children, params: { id } }: Props) => {
    const author = await authorService.findOne(id);

    if (!author) {
        notFound();
    }

    return <SidebarLayout sidebar={<AuthorCard author={author} />}>{children}</SidebarLayout>;
};

export default AuthorLayout;
