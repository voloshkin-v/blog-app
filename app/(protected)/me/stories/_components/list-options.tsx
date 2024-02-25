'use client';

import type { Post } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { useAction } from 'next-safe-action/hooks';
import { useToast } from '@/components/ui/use-toast';
import { deletePost } from '@/actions/post/delete-post';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
    story: Pick<Post, 'id' | 'title' | 'createdAt'>;
}

export const ListOptions = ({ story }: Props) => {
    const { toast } = useToast();

    const { execute, status } = useAction(deletePost, {
        onError: (error) => {
            toast({
                title: 'Oops, something went wrong!',
                description: error.serverError,
                variant: 'destructive',
            });
        },
        onSuccess: (data) => {
            toast({
                title: 'Post successfully deleted!',
            });
        },
    });

    const handleDelete = () => {
        execute(story.id);
    };

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                        <Link href={`/posts/${story.id}`} className="cursor-pointer">
                            Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild disabled={status === 'executing'}>
                        <AlertDialogTrigger className="w-full cursor-pointer">Delete</AlertDialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your story!
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
