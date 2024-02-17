'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export const Social = () => {
    return (
        <div className="w-full space-y-4">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-full border"></div>
                <div className="z-10 bg-white px-2 text-center text-xs uppercase">or continue with</div>
            </div>

            <div className="flex gap-2">
                <Button size="lg" variant="outline" className="w-full">
                    <FaGoogle />
                </Button>

                <Button size="lg" variant="outline" className="w-full" onClick={() => signIn('github')}>
                    <FaGithub />
                </Button>
            </div>
        </div>
    );
};
