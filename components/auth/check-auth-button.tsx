'use client';

import { useCurrentUser } from '@/lib/auth/use-current-user';
import { Children, cloneElement, isValidElement } from 'react';

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Social } from '@/components/auth/social';

interface Props extends ButtonProps {
    children: React.ReactNode;
}

export const CheckAuthButton = ({ children, ...props }: Props) => {
    const user = useCurrentUser();

    if (!user) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button {...props} onClick={() => {}}>
                        {children}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <h2>Sign up with</h2>
                    </DialogTitle>

                    <Social />
                </DialogContent>
            </Dialog>
        );
    }

    return <Button {...props}>{children}</Button>;
};
