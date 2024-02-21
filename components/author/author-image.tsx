import { FaUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Props {
    src: string;
    alt?: string;
    className?: string;
}

export const AuthorImage = ({ alt, className, src }: Props) => {
    return (
        <Avatar className={cn('border', className)}>
            <AvatarImage src={src} alt={alt || 'Profile picture'} />

            <AvatarFallback>
                <FaUser />
            </AvatarFallback>
        </Avatar>
    );
};
