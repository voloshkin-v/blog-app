import { Logo } from '@/components/shared/logo';
import { NavLink } from '@/components/header/nav-link';
import { HeaderAuth } from '@/components/header/header-auth';

export const Header = async () => {
    return (
        <header className="fixed left-0 top-0 z-50 flex min-h-16 w-screen border-b bg-white py-2">
            <div className="container flex items-center">
                <Logo />

                <div className="ml-auto flex items-center gap-2 sm:gap-4">
                    <NavLink href="/topics">Topics</NavLink>
                    <NavLink href="/posts">Posts</NavLink>

                    <HeaderAuth />
                </div>
            </div>
        </header>
    );
};
