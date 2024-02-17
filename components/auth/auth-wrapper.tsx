import { Social } from './social';

interface Props {
    children: React.ReactNode;
}

export const AuthWrapper = ({ children }: Props) => {
    return (
        <div>
            <div></div>
            <div>{children}</div>
            <Social />
        </div>
    );
};
