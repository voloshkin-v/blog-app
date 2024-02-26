import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
    src: string | null;
    alt?: string;
    className?: string;
    imageClassName?: string;
}

export const PostImage = ({ src, alt, className = '', imageClassName = '' }: Props) => {
    if (!src) {
        return false;
    }

    return (
        <div className={cn('relative h-40 w-40 max-w-40', className)}>
            <Image src={src} fill alt={alt || 'Post image'} className={cn('rounded object-cover', imageClassName)} />
        </div>
    );
};
