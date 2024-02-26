import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DOMPurify from 'isomorphic-dompurify';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getCleanHtml = (html: string) => {
    const clean = DOMPurify.sanitize(html);
    return clean;
};
