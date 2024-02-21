interface Props {
    title: string;
    children?: React.ReactNode;
}

export const SectionHeader = ({ title, children }: Props) => {
    return (
        <div className="border-b pb-8 text-center md:pb-16">
            <h1>{title}</h1>

            {children && <div className="mt-4 text-muted-foreground">{children}</div>}
        </div>
    );
};
