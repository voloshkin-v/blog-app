import { prisma } from '@/lib/db';

class PostsService {
    async findAll(authorId?: string) {
        try {
            return await prisma.post.findMany({
                where: {
                    authorId,
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    savedByUser: {
                        select: { id: true },
                    },
                    topics: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } catch (err) {
            throw new Error('Failed to fetch posts');
        }
    }

    async findOne(id: string) {
        try {
            return await prisma.post.findUnique({
                where: { id },
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    savedByUser: {
                        select: { id: true },
                    },
                    topics: true,
                },
            });
        } catch (err) {
            throw new Error('Failed to fetch post');
        }
    }

    async findSaved(userId: string) {
        try {
            return await prisma.post.findMany({
                where: {
                    savedByUser: {
                        some: { id: userId },
                    },
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    savedByUser: {
                        select: { id: true },
                    },
                    topics: true,
                },
            });
        } catch (err) {
            throw new Error('Failed to fetch saved posts');
        }
    }
}

export const postsService = new PostsService();
