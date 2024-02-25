import { notFound } from 'next/navigation';

import { SidebarLayout } from '@/components/sidebar-layout';
import { AuthorCard } from '@/app/author/[id]/_components/author-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAuthorById } from '@/lib/services/author';

const AuthorPage = async ({ params: { id } }: { params: { id: string } }) => {
    const author = await getAuthorById(id);

    if (!author) {
        notFound();
    }

    return (
        <>
            <h1 className="mb-10">{author.name}</h1>

            <Tabs defaultValue="home">
                <TabsList className="">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>

                <TabsContent value="home">
                    <p>Home</p>
                </TabsContent>

                <TabsContent value="about">
                    <p>About</p>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default AuthorPage;
