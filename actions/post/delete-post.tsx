'use server';

import { z } from 'zod';
import { action } from '@/lib/safe-action';
import { prisma } from '@/lib/db';
import { currentUser } from '@/lib/session';
import { revalidatePath } from 'next/cache';

const id = z.string();

const wait = () => new Promise((res) => setTimeout(res, 2000));

export const deletePost = action(id, async (id) => {
    const user = await currentUser();
    await wait();

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
