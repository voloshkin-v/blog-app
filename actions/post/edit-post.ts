'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { getPostById } from '@/lib/db/queries/posts';
import { editPostSchema } from '@/lib/schemas';

export const editPost = action(editPostSchema, async (data) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const { content, title, preview, image, id, topics } = data;

    const post = await prisma.post.findUnique({ where: { id }, include: { topics: true } });
    if (!post) {
        throw new Error('Post not found!');
    }

    const postTopics = post.topics.map((item) => item.name);
    const disappearedTopics = postTopics.filter((item) => !topics?.includes(item));

    const editedPost = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            preview,
            image,
            topics: {
                disconnect: disappearedTopics.map((item) => ({
                    name: item,
                })),
                connectOrCreate: topics?.map((topic) => ({
                    where: {
                        name: topic,
                    },
                    create: {
                        name: topic,
                    },
                })),
            },
        },
    });

    redirect(`/posts/${editedPost.id}`);
});
