'use client';

import { BookMarked, LogOut, User } from 'lucide-react';
import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import { FaUser } from 'react-icons/fa';
import { logout } from '@/actions/auth';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { AuthorImage } from '../author/author-image';

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
                    <Link href="/saved">
                        <BookMarked className="mr-2 h-4 w-4" />
                        Saved
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
