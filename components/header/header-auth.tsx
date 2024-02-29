'use client';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { SquarePen } from 'lucide-react';

import { CheckAuthButton } from '@/components/auth/check-auth-button';
import { UserButton } from '@/components/auth/user-button';
import { NavLink } from './nav-link';

export const HeaderAuth = () => {
    const user = useCurrentUser();

    if (!user) {
        return <CheckAuthButton>Get started</CheckAuthButton>;
    }

    return (
        <>
            <NavLink href="/new-story">
                Write <SquarePen className="w-4" />
            </NavLink>

            <UserButton />
        </>
    );
};
