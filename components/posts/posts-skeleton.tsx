import { Skeleton } from '@/components/ui/skeleton';

export const PostsSkeleton = () => {
    return (
        <div className="space-y-12">
            {Array.from({ length: 5 }, (item, i) => (
                <article key={i} className="space-y-2">
                    <div className="row">
                        <div className="row">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                        </div>

                        <Skeleton className="h-1 w-1" />
                        <Skeleton className="h-5 w-24" />
                    </div>

                    <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-8">
                        <div className="block flex-1 space-y-1">
                            <Skeleton className="h-7 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>

                        <Skeleton className="h-40 w-40" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Skeleton key={i} className="h-4 w-16" />
                        <Skeleton key={i} className="h-9 w-24" />
                    </div>
                </article>
            ))}
        </div>
    );
};
