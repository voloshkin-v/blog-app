import { Skeleton } from '@/components/ui/skeleton';

export const TopicsSkeleton = () => {
    return (
        <div className="space-y-4">
            <Skeleton className="h-9 max-w-40" />

            <div className="flex flex-wrap gap-4">
                {Array.from({ length: 8 }, (item, i) => (
                    <Skeleton key={i} className="h-9 w-24" />
                ))}
            </div>

            <Skeleton className="h-6 max-w-16" />
        </div>
    );
};
