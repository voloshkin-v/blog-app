import { Info } from 'lucide-react';

import { Tooltip as TooltipLib, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
    children: React.ReactNode;
}

export const Tooltip = ({ children }: Props) => {
    return (
        <TooltipProvider>
            <TooltipLib>
                <TooltipTrigger asChild>
                    <Info className="h-4 w-4 cursor-pointer" />
                </TooltipTrigger>

                <TooltipContent>{children}</TooltipContent>
            </TooltipLib>
        </TooltipProvider>
    );
};
