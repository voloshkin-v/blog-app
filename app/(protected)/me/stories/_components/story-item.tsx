import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { ListOptions } from './list-options';

interface Props {
    story: {
        title: string;
        id: string;
        createdAt: Date;
    };
}

export const Story = ({ story }: Props) => {
    return (
        <div key={story.id} className="py-4 first:pt-0 last:pb-0">
            <h3>
                <Link href={`/posts/${story.id}`} className="link">
                    {story.title}
                </Link>
            </h3>

            <div className="row">
                <p className="text-xs">
                    <span>Published: </span>

                    {formatDistanceToNow(story.createdAt, {
                        addSuffix: true,
                    })}
                </p>

                <ListOptions story={story} />
            </div>
        </div>
    );
};
