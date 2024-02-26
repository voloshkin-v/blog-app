'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    preview: z.string().min(1),
    image: z.string().optional(),
    topicsList: z.string().array().optional(),
});

export const createPost = action(createPostSchema, async (data) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const { content, title, preview, image, topicsList } = data;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            preview,
            authorId: user.id,
            image,
            topics: {
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

    redirect(`/posts/${newPost.id}`);
});
