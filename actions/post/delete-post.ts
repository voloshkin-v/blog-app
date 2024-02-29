'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { prisma } from '@/lib/db';
import { currentUser } from '@/lib/auth/current-user';
import { revalidatePath } from 'next/cache';

const id = z.string();

export const deletePost = action(id, async (id) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            topics: true,
        },
    });

    if (!post) {
        throw new Error('Post does not exist!');
    }

    await prisma.post.delete({
        where: { id },
    });

    const topics = await prisma.topic.findMany({
        where: {
            id: { in: post.topics.map((topic) => topic.id) },
        },
        include: { _count: { select: { posts: true } } },
    });

    for (const topic of topics) {
        if (!topic._count.posts) {
            await prisma.topic.delete({
                where: {
                    id: topic.id,
                },
            });
        }
    }

    revalidatePath('/me/stories');
});
