import { currentUser } from '@/lib/session';

import { Logo } from '@/components/shared/logo';
import { Nav } from '@/components/nav';
import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import { AddPostLink } from '@/components/shared/add-post-link';

export const Header = async () => {
    const user = await currentUser();

    return (
        <header className="flex min-h-16 border-b py-2">
            <div className="container flex items-center">
                <Logo />

                <div className="ml-auto flex items-center gap-4">
                    <Nav />

                    {user ? (
                        <>
                            <AddPostLink />
                            <UserButton />
                        </>
                    ) : (
                        <LoginButton mode="modal" asChild>
                            <Button>Get started</Button>
                        </LoginButton>
                    )}
                </div>
            </div>
        </header>
    );
};
