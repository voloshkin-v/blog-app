import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

import { SidebarLayout } from '@/components/sidebar-layout';
import { AuthorCard } from '@/app/author/[id]/_components/author-card';

interface Props {
    children: React.ReactNode;
    params: { id: string };
}

const AuthorLayout = async ({ children, params: { id } }: Props) => {
    const author = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
            description: true,
        },
    });

    if (!author) {
        notFound();
    }

    return <SidebarLayout sidebar={<AuthorCard author={author} />}>{children}</SidebarLayout>;
};

export default AuthorLayout;
