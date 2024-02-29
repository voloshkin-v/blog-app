import { z } from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(5, { message: 'The name must be at least 5 characters long' }),
    content: z.string().min(20),
    preview: z.string().min(5, { message: 'The preview must be at least 5 characters long' }),
    image: z.string().optional(),
    topics: z.string().array().optional(),
});

export const editPostSchema = createPostSchema.partial().and(
    z.object({
        id: z.string(),
    }),
);
