import React from 'react';

export const ErrorFormMessage = ({ message }: { message: string | undefined }) => {
    if (!message) return false;
    return <div className="text-sm">{message}</div>;
};
