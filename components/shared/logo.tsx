import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href="/">
            <Image src="logo.svg" alt="Logo" width={35} height={35} />
        </Link>
    );
};
