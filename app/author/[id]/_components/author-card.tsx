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
            </div>
        </div>
    );
};
