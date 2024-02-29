import { Skeleton } from '@/components/ui/skeleton';

export const StoriesSketon = () => {
    return (
        <div>
            {Array.from({ length: 3 }, (item, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                    <Skeleton className="mb-1 h-6 w-full" />

                    <div className="row">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                </div>
            ))}
        </div>
    );
};
