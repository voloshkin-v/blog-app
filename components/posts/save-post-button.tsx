'use client';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { PinOff, Pin } from 'lucide-react';
import type { SavedByUsers } from '@/lib/db/types';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { savePost } from '@/actions/post/save-post';
import { unsavePost } from '@/actions/post/unsave-post';
import { useAction } from 'next-safe-action/hooks';

import { CheckAuthButton } from '@/components/auth/check-auth-button';

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
            setSaved(true);

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
            setSaved(false);

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
        if (saved) {
            unsave(postId);
        } else {
            save(postId);
        }
    };

    return (
        <CheckAuthButton
            className="flex cursor-pointer gap-2"
            variant="secondary"
            disabled={saveStatus === 'executing' || unsaveStatus === 'executing'}
            onClick={handleSave}
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
        </CheckAuthButton>
    );
};
