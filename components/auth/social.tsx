'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { DEFAULT_PAGE_REDIRECT } from '@/lib/constants/route';

import { Button } from '@/components/ui/button';

export const Social = () => {
    const handleSignIn = (provider: 'google' | 'github') => {
        signIn(provider, {
            callbackUrl: DEFAULT_PAGE_REDIRECT,
        });
    };

    return (
        <div className="flex w-full flex-col gap-5">
            <Button size="lg" variant="outline" className="w-full" onClick={() => handleSignIn('google')}>
                <FaGoogle />
            </Button>

            <Button size="lg" variant="outline" className="w-full" onClick={() => handleSignIn('github')}>
                <FaGithub />
            </Button>
        </div>
    );
};
