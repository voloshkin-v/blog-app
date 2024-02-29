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
    });

    if (!post) {
        throw new Error('Post does not exist!');
    }

    const deletedPost = await prisma.post.delete({
        where: { id },
    });

    revalidatePath('/me/stories');
});
