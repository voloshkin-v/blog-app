import { prisma } from '@/lib/db';

class AuthorService {
    async findOne(id: string) {
        try {
            return await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    image: true,
                    name: true,
                    email: true,
                },
            });
        } catch (err) {
            throw new Error('Failed to fetch author');
        }
    }
}

export const authorService = new AuthorService();
