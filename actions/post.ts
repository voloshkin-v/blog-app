'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const savePost = async (postId: string, userId: string) => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                savedPosts: {
                    connect: {
                        id: postId,
                    },
                },
            },
        });
    } catch (err) {
        throw new Error('Post could not be saved!');
    }

    revalidatePath('/saved');
};

export const unsavePost = async (postId: string, userId: string) => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                savedPosts: {
                    disconnect: {
                        id: postId,
                    },
                },
            },
        });
    } catch (err) {
        throw new Error('Post could not be unsaved!');
    }

    revalidatePath('/saved');
};
