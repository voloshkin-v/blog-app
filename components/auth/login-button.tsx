'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from '@/components/auth/login-form';
import { Social } from '@/components/auth/social';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';

interface Props {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    redirectUrl?: string;
    asChild?: boolean;
}

export const LoginButton = ({ children, mode = 'modal', redirectUrl = '/auth/login', asChild }: Props) => {
    const router = useRouter();

    if (mode === 'modal') {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>

                <DialogContent>
                    <LoginForm />
                    <Social />
                </DialogContent>
            </Dialog>
        );
    }

    return <div onClick={() => router.push(redirectUrl)}>{children}</div>;
};
