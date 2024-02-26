'use server';

import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/session';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const id = z.string();

export const savePost = action(id, async (id) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error('Session not found!');
    }

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
        throw new Error('Post not found');
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            savedPosts: {
                connect: {
                    id,
                },
            },
        },
    });

    revalidatePath('/saved');
});
