'use client';

import { savePost, unsavePost } from '@/actions/post';
import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import { PinOff, Pin } from 'lucide-react';
import { SavedByUsers } from '@/components/posts/types';
import { useToast } from '@/components/ui/use-toast';
import { useOptimistic, useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { CheckAuthButton } from '@/components/auth/check-auth-button';

interface Props {
    postId: string;
    savedByUser: SavedByUsers[];
}

export const SavePostButton = ({ postId, savedByUser }: Props) => {
    const user = useCurrentUser();
    const isSaved = savedByUser.map((item) => item.id).includes(user?.id || '');

    const { toast } = useToast();
    const [saved, setSaved] = useState(isSaved);
    const [isPending, startTransition] = useTransition();

    const handleSave = async () => {
        if (!user?.id) return;

        try {
            if (saved) {
                await unsavePost(postId, user.id);
                setSaved(false);

                toast({
                    description: 'Post successfully unsaved',
                });
            } else {
                await savePost(postId, user.id);
                setSaved(true);

                toast({
                    description: 'Post successfully saved',
                });
            }
        } catch (err) {
            toast({
                description: 'Uh oh! Something went wrong.',
                variant: 'destructive',
            });
        }
    };

    return (
        <CheckAuthButton>
            <Button
                disabled={isPending}
                variant="ghost"
                className="flex cursor-pointer gap-2"
                onClick={() => startTransition(() => handleSave())}
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
