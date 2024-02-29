import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
    src: string;
    className?: string;
    parentClassName?: string;
}

export const PostImage = ({ src, className = '', parentClassName = '' }: Props) => {
    if (!src) {
        return false;
    }

    return (
        <div className={cn('relative h-40 w-40 max-w-40', parentClassName)}>
            <Image src={src} fill alt="Post image" className={cn('rounded object-cover', className)} />
        </div>
    );
};
