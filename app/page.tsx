import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default async function Home() {
    return (
        <main>
            <section className="py border-b bg-secondary">
                <div className="container space-y-2">
                    <h1>Stay curious.</h1>
                    <p>Discover stories, thinking, and expertise from writers on any topic.</p>

                    <div className="pt-4">
                        <Button asChild>
                            <Link href="/posts">Start reading</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
