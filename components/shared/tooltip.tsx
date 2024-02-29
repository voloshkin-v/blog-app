import { Info } from 'lucide-react';

import { Tooltip as TooltipLib, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface Props {
    children: React.ReactNode;
}

export const Tooltip = ({ children }: Props) => {
    return (
        <TooltipProvider>
            <TooltipLib>
                <TooltipTrigger asChild className="hidden lg:flex">
                    <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>{children}</TooltipContent>
            </TooltipLib>
        </TooltipProvider>
    );
};
