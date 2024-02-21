import { Post as PrismaPost, Topic } from '@prisma/client';
import { User } from 'next-auth';

export interface SavedByUsers {
    id: string;
}

export interface Post extends PrismaPost {
    author: Pick<User, 'image' | 'name'>;
    topics: Topic[];
    savedByUser: SavedByUsers[];
}
