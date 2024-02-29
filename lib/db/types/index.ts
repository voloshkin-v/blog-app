import { Post as PrismaPost } from '@prisma/client';

export interface SavedByUsers {
    id: string;
}

export interface Post extends PrismaPost {
    author: {
        image: string | null;
        name: string | null;
    };
    topics: {
        id: string;
        name: string;
    }[];
    savedByUser: SavedByUsers[];
}
