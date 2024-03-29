interface Props {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

export const SidebarLayout = ({ sidebar, children }: Props) => {
    return (
        <div className="container flex min-h-full flex-col md:flex-row md:gap-20">
            <main className="py basis-2/3">{children}</main>

            <aside className="py basis-1/3 space-y-8 border-t md:space-y-16 md:border-l md:border-t-0 md:px-6">
                <div className="flex flex-col gap-10 md:sticky md:top-16">{sidebar}</div>
            </aside>
        </div>
    );
};
