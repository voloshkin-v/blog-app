import { prisma } from '@/lib/db';
import { Post } from '@/lib/db/types';

export const getPopularPosts = async (page: number = 1): Promise<Post[]> => {
    const PER_PAGE = 20;
    const SKIP = (page - 1) * PER_PAGE;

    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    image: true,
                    name: true,
                },
            },
            savedByUser: {
                select: { id: true },
            },
            topics: true,
        },
        orderBy: [
            {
                likes: {
                    _count: 'desc',
                },
            },
        ],
        take: PER_PAGE,
        skip: SKIP,
    });

    return posts;
};

export const getPosts = async (authorId?: string, page?: string): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
        where: {
            authorId,
        },
        include: {
            author: {
                select: {
                    image: true,
                    name: true,
                },
            },
            savedByUser: {
                select: { id: true },
            },
            topics: true,
        },
    });

    return posts;
};

export const getPostsByTopicId = async (id: string): Promise<Post[]> => {
    const posts = await prisma.post.findMany({
        where: {
            topics: {
                some: {
                    id,
                },
            },
        },
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
    });

    return posts;
};

export const getPostById = async (id: string) => {
    const post = await prisma.post.findUnique({
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
            likes: {
                select: {
                    id: true,
                },
            },
        },
    });

    return post;
};

export const getSavedPosts = async (id: string) => {
    const savedPosts = await prisma.post.findMany({
        where: {
            savedByUser: {
                some: { id },
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

    return savedPosts;
};

export const getPublishedPosts = async (id: string) => {
    const publishedPosts = await prisma.post.findMany({
        where: {
            authorId: id,
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return publishedPosts;
};
