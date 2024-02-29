'use client';

import { BookMarked, LogOut, User, Newspaper } from 'lucide-react';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { logout } from '@/actions/auth';
import Link from 'next/link';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AuthorImage } from '@/components/author/author-image';

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <AuthorImage src={user?.image || ''} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex flex-col font-normal">
                    <span>{user?.name}</span>
                    <span className="text-sm text-muted-foreground">{user?.email}</span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={`/author/${user?.id}`}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/me/saved">
                        <BookMarked className="mr-2 h-4 w-4" />
                        Saved
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/me/stories">
                        <Newspaper className="mr-2 h-4 w-4" />
                        Stories
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
