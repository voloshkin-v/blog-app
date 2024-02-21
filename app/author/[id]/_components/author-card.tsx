import { User } from '@prisma/client';
import Link from 'next/link';
import pluralize from 'pluralize';

import { AuthorImage } from '@/components/author/author-image';

interface Props {
    author: Pick<User, 'id' | 'image' | 'email' | 'name' | 'description'>;
}

export const AuthorCard = ({ author }: Props) => {
    return (
        <div className="space-y-6 text-sm">
            <Link href={`/author/${author.id}`}>
                <AuthorImage src={author.image || ''} className="h-16 w-16" />
            </Link>

            <div className="space-y-2">
                <h2 className="text-base">
                    <Link href={`/author/${author.id}`}>{author.name}</Link>
                </h2>

                <Link href={`/author/${author.id}/followers`} className="link-underline">
                    {pluralize('Follower', 1, true)}
                </Link>

                {author.description && <p className="text-muted-foreground">{author.description}</p>}
            </div>

            <div>
                <h3>Following</h3>

                <ul>
                    <li>user1</li>
                    <li>user1</li>
                    <li>user1</li>
                </ul>

                <Link href={`/author/${author.id}/following`}>See all (44)</Link>
            </div>
        </div>
    );
};
