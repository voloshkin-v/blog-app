import { cn } from '@/lib/utils';
import { Loader as LoaderIcon } from 'lucide-react';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const Loader = ({ className, children }: Props) => {
    return (
        <div>
            {children && <span className="mr-1">{children}</span>}
            <LoaderIcon className={cn('inline-flex animate-spin-slow', className)} />
        </div>
    );
};
