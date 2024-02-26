import { currentUser } from '@/lib/session';
import { SquarePen } from 'lucide-react';

import { Logo } from '@/components/shared/logo';
import { UserButton } from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/shared/link';
import { CheckAuthButton } from '@/components/auth/check-auth-button';

export const Header = async () => {
    const user = await currentUser();

    return (
        <header className="fixed left-0 top-0 z-50 flex min-h-16 w-screen border-b bg-white py-2">
            <div className="container flex items-center">
                <Logo />

                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <Link href="/topics">Topics</Link>
                    <Link href="/posts">Posts</Link>

                    {user ? (
                        <>
                            <Link href="/new-story">
                                Write <SquarePen className="w-4" />
                            </Link>

                            <UserButton />
                        </>
                    ) : (
                        <CheckAuthButton>
                            <Button>Get started</Button>
                        </CheckAuthButton>
                    )}
                </div>
            </div>
        </header>
    );
};
