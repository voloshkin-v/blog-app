'use client';

import { useCurrentUser } from '@/lib/hooks/use-current-user';
import { PinOff, Pin } from 'lucide-react';
import { SavedByUsers } from '@/components/posts/types';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { savePost } from '@/actions/post/save-post';
import { unsavePost } from '@/actions/post/unsave-post';

import { Button } from '@/components/ui/button';
import { CheckAuthButton } from '@/components/auth/check-auth-button';
import { useAction } from 'next-safe-action/hooks';

interface Props {
    postId: string;
    savedByUser: SavedByUsers[];
}

export const SavePostButton = ({ postId, savedByUser }: Props) => {
    const { toast } = useToast();

    const user = useCurrentUser();
    const isSaved = savedByUser.map((item) => item.id).includes(user?.id || '');
    const [saved, setSaved] = useState(isSaved);

    const { status: saveStatus, execute: save } = useAction(savePost, {
        onSuccess: () => {
            toast({
                title: 'Post saved!',
            });
        },
        onError: (error) => {
            toast({
                title: 'Oops, something went wrong!',
                description: error.serverError,
                variant: 'destructive',
            });
        },
    });

    const { status: unsaveStatus, execute: unsave } = useAction(unsavePost, {
        onSuccess: () => {
            toast({
                title: 'Post unsaved!',
            });
        },
        onError: (error) => {
            toast({
                title: 'Oops, something went wrong!',
                description: error.serverError,
                variant: 'destructive',
            });
        },
    });

    const handleSave = () => {
        if (!user?.id) return;

        if (isSaved) {
            setSaved(false);
            unsave(postId);
        } else {
            setSaved(true);
            save(postId);
        }
    };

    return (
        <CheckAuthButton>
            <Button
                disabled={unsaveStatus === 'executing' || saveStatus === 'executing'}
                variant="ghost"
                onClick={handleSave}
                className="flex cursor-pointer gap-2"
            >
                {saved ? (
                    <>
                        <PinOff className="h-4 w-4" /> Unsave
                    </>
                ) : (
                    <>
                        <Pin className="h-4 w-4" /> Save
                    </>
                )}
            </Button>
        </CheckAuthButton>
    );
};
