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
    })
    .partial();

export const editPost = action(editPostSchema, async (data) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const { content, title, preview, image, id } = data;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
        throw new Error('Post not found!');
    }

    const editedPost = await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            content,
            preview,
            image,
        },
    });

    redirect(`/posts/${editedPost.id}`);
});
