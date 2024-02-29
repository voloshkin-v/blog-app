import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

const ITEMS_PER_PAGE = 12;

export const getPopularTopics = async (take: number = 8) => {
    const popularTopics = await prisma.topic.findMany({
        orderBy: {
            posts: {
                _count: 'desc',
            },
        },
        take,
    });

    return popularTopics;
};

export const getTopicsCount = async (query: string) => {
    try {
        const count = await prisma.topic.count({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        });

        return Math.ceil(count / ITEMS_PER_PAGE);
    } catch (error) {
        throw new Error('Failed to fetch count of topics');
    }
};

export const getTopics = async (query?: string, page: number = 1) => {
    try {
        const validateCurrentPage = page > 0 ? page : 1;
        const take = validateCurrentPage * ITEMS_PER_PAGE;

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
};

export const getTopicById = async (id: string) => {
    try {
        return prisma.topic.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        throw new Error('Failed to fetch topics');
    }
};
