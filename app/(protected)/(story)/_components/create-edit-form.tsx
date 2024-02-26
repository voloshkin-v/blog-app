'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => (
        <div className="px-[15px] py-3">
            <Loader />
        </div>
    ),
});
import 'react-quill/dist/quill.bubble.css';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Preview } from './preview';
import { Loader } from '@/components/shared/loader';
import { Post } from '@/components/posts/types';

interface Props {
    story?: Post;
}

export const CreateEditForm = ({ story }: Props) => {
    const [title, setTitle] = useState(story?.title || '');
    const [content, setContent] = useState(story?.content || '');

    // Check if title and content are empty
    const isDisable = !title || content.replace(/<(.|\n)*?>/g, '').trim().length === 0;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <div className="py container space-y-6">
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                className="w-full text-4xl outline-none"
            />

            <div className="min-h-[52px]">
                <ReactQuill
                    theme="bubble"
                    value={content}
                    onChange={setContent}
                    placeholder="Tell your story..."
                    className="quill"
                />
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={isDisable}>{story ? 'Edit' : 'Publish'}</Button>
                </DialogTrigger>

                <DialogContent className="h-full max-w-full rounded-none py-10 md:p-24">
                    <Preview title={title} onChangeTitle={handleTitleChange} content={content} story={story} />
                </DialogContent>
            </Dialog>
        </div>
    );
};
