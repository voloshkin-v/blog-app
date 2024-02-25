'use client';

import { useCurrentUser } from '@/lib/hooks/use-current-user';

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Social } from '@/components/auth/social';

interface Props {
    asChild?: boolean;
    children: React.ReactNode;
}

export const CheckAuthButton = ({ asChild = true, children }: Props) => {
    const user = useCurrentUser();

    if (!user) {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>{children}</DialogTrigger>

                <DialogContent>
                    <DialogTitle>
                        <h2>Sign up with</h2>
                    </DialogTitle>

                    <Social />
                </DialogContent>
            </Dialog>
        );
    }

    return children;
};
