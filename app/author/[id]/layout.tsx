import { notFound } from 'next/navigation';
import { getAuthorById } from '@/lib/db/queries/author';

import { SidebarLayout } from '@/components/sidebar-layout';
import { AuthorCard } from '@/app/author/[id]/_components/author-card';

interface Props {
    children: React.ReactNode;
    params: { id: string };
}

const AuthorLayout = async ({ children, params: { id } }: Props) => {
    const author = await getAuthorById(id);

    if (!author) {
        notFound();
    }

    return <SidebarLayout sidebar={<AuthorCard author={author} />}>{children}</SidebarLayout>;
};

export default AuthorLayout;
