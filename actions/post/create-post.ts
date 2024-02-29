'use server';

import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import { createPostSchema } from '@/lib/schemas';

export const createPost = action(createPostSchema, async (data) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const { content, title, preview, image, topics } = data;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            preview,
            authorId: user.id,
            image,
            topics: {
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

    redirect(`/posts/${newPost.id}`);
});
