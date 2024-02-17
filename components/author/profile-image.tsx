import { FaUser } from 'react-icons/fa';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Props {
    src: string | null | undefined;
    alt?: string;
    classNames?: string;
}

export const ProfileImage = ({ alt, classNames, src }: Props) => {
    return (
        <Avatar className={classNames}>
            <AvatarImage src={src || ''} alt={alt || 'Profile picture'} />
            <AvatarFallback>
                <FaUser />
            </AvatarFallback>
        </Avatar>
    );
};
