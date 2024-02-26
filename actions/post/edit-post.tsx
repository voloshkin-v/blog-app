'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

const editPostSchema = z
    .object({
        id: z.string(),
        title: z.string().min(1),
        content: z.string().min(1),
        preview: z.string().min(1),
        image: z.string(),
        topicsList: z.string().array(),
    })
    .partial();

export const editPost = action(editPostSchema, async (data) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const { content, title, preview, image, id, topicsList } = data;

    const post = await prisma.post.findUnique({ where: { id }, include: { topics: true } });
    if (!post) {
        throw new Error('Post not found!');
    }

    const postTopics = post.topics.map((item) => item.name);
    const disappearedTopics = postTopics.filter((item) => !topicsList?.includes(item));

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
                connectOrCreate: topicsList?.map((topic) => ({
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
