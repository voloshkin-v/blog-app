import { prisma } from '@/lib/db';

export const getAuthorById = async (id: string) => {
    const author = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            image: true,
            name: true,
            email: true,
        },
    });

    return author;
};
