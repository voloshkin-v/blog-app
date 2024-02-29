'use client';

import { Heart } from 'lucide-react';

import { CheckAuthButton } from '@/components/auth/check-auth-button';
import { useState } from 'react';
import { useCurrentUser } from '@/lib/auth/use-current-user';
import { useAction } from 'next-safe-action/hooks';
import { likePost } from '@/actions/post/like-post';
import { useToast } from '../ui/use-toast';
import { unlikePost } from '@/actions/post/unlike-post';

interface Props {
    postId: string;
    likedByUser: {
        id: string;
    }[];
}

export const LikePostButton = ({ postId, likedByUser }: Props) => {
    const { toast } = useToast();
    const user = useCurrentUser();
    const initialCurrentUserLikeState = likedByUser.map((item) => item.id).includes(user?.id || '');

    const [likes, setLikes] = useState(likedByUser.length);
    const [liked, setLiked] = useState(initialCurrentUserLikeState);

    const { status: likeStatus, execute: like } = useAction(likePost, {
        onSuccess: () => {
            setLikes((prev) => prev + 1);
            setLiked(true);

            toast({
                title: 'You liked the post!',
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

    const { status: unlikeStatus, execute: unlike } = useAction(unlikePost, {
        onSuccess: () => {
            setLikes((prev) => prev - 1);
            setLiked(false);

            toast({
                title: 'You unliked the post!',
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

    const handleLike = () => {
        if (liked) {
            unlike(postId);
            return;
        }

        like(postId);
    };

    return (
        <CheckAuthButton
            className="flex cursor-pointer gap-2"
            variant="secondary"
            onClick={handleLike}
            disabled={likeStatus === 'executing' || unlikeStatus === 'executing'}
        >
            <Heart className={`h-4 w-4 ${liked ? 'fill-red-600' : ''}`} />
            {likes}
        </CheckAuthButton>
    );
};
