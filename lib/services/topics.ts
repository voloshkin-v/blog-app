import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

const wait = () => new Promise((res) => setTimeout(res, 4000));

class TopicsService {
    private ITEMS_PER_PAGE = 12;

    async findPopular(take: number = 8) {
        try {
            return await prisma.topic.findMany({
                orderBy: {
                    posts: {
                        _count: 'desc',
                    },
                },
                take,
            });
        } catch (error) {
            throw new Error('Failed to fetch popular topics');
        }
    }

    async getCount(query: string) {
        try {
            const count = await prisma.topic.count({
                where: {
                    name: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            });

            return Math.ceil(count / this.ITEMS_PER_PAGE);
        } catch (error) {
            throw new Error('Failed to fetch count of topics');
        }
    }

    async findAll(query?: string, page: number = 1) {
        try {
            const validateCurrentPage = page > 0 ? page : 1;
            const take = validateCurrentPage * this.ITEMS_PER_PAGE;

            const where: Prisma.TopicWhereInput = {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            };

            const [topics, total] = await prisma.$transaction([
                prisma.topic.findMany({
                    take,
                    where,
                }),
                prisma.topic.count(),
            ]);

            return { topics, total };
        } catch (error) {
            throw new Error('Failed to fetch topics');
        }
    }

    async findByCatId(id: string) {
        try {
            return await prisma.topic.findUnique({
                where: { id },
                include: {
                    posts: {
                        include: {
                            author: {
                                select: {
                                    image: true,
                                    name: true,
                                },
                            },
                            topics: true,
                            savedByUser: { select: { id: true } },
                        },
                    },
                },
            });
        } catch (error) {
            throw new Error('Failed to fetch topics by category id');
        }
    }
}

export const topicsService = new TopicsService();
