'use server';

import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/auth/current-user';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getPostById } from '@/lib/db/queries/posts';

const id = z.string();

export const unsavePost = action(id, async (id) => {
    const user = await currentUser();

    if (!user) {
        throw new Error('Session not found!');
    }

    const post = await getPostById(id);
    if (!post) {
        throw new Error('Post not found');
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            savedPosts: {
                disconnect: {
                    id,
                },
            },
        },
    });

    revalidatePath('/me/saved');
});
