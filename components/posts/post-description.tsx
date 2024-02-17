import { trimString } from '@/lib/utils';
import React from 'react';

interface Props {
    description: string | null;
    maxLength?: number;
}

export const PostDescription = ({ description, maxLength }: Props) => {
    if (!description) return null;

    return <p>{maxLength ? trimString(description, maxLength) : description}</p>;
};
