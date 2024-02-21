import { trimString } from '@/lib/utils';
import React from 'react';

interface Props {
    description: string;
    maxLength?: number;
}

export const PostDescription = ({ description, maxLength }: Props) => {
    return <p>{trimString(description, maxLength)}</p>;
};
