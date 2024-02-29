'use server';

import { action } from '@/lib/safe-action';
import { currentUser } from '@/lib/auth/current-user';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getPostById } from '@/lib/db/queries/posts';

const id = z.string();

export const unlikePost = action(id, async (id) => {
    const user = await currentUser();

    if (!user) {
        throw new Error('Session not found!');
    }

    const post = await getPostById(id);
    if (!post) {
        throw new Error('Post not found');
    }

    await prisma.post.update({
        where: { id },
        data: {
            likes: {
                disconnect: {
                    id: user.id,
                },
            },
        },
    });

    revalidatePath(`/posts/${post.id}`);
});
