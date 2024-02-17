import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: 'Email is required',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
});

export const registerSchema = z
    .object({
        name: z.string().min(1, {
            message: 'Name is required',
        }),
        email: z.string().email({
            message: 'Email is required',
        }),
        password: z.string().min(6, {
            message: 'Minimum 6 characters required',
        }),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    });
