import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from '@/components/ui/use-toast';
import { createPost } from '@/actions/post/create-post';
import { editPost } from '@/actions/post/edit-post';

import { Button } from '@/components/ui/button';
import { FileUpload } from './file-upload';
import { Post } from '@/components/posts/types';

interface Props {
    title: string;
    content: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    story?: Post;
}

export const Preview = ({ content, title, onChangeTitle, story }: Props) => {
    const [imageUrl, setImageUrl] = useState(story?.image || '');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [topics, setTopics] = useState(story?.topics.map((item) => item.name).join(', ') || '');
    const [preview, setPreview] = useState(story?.preview || '');

    const isDisable = isFileLoading || !preview || !title || !content;

    const { execute: createExecute, status: createStatus } = useAction(createPost, {
        onError: (error) => {
            toast({
                title: 'Something went wrong!',
                description: 'Post could not be added',
                variant: 'destructive',
            });
        },
        onSuccess: (data) => {
            toast({
                title: 'Post created!',
            });
        },
    });

    const { execute: editExecute, status: editStatus } = useAction(editPost, {
        onError: (error) => {
            toast({
                title: 'Something went wrong!',
                description: 'Post could not be added',
                variant: 'destructive',
            });
        },
        onSuccess: (data) => {
            toast({
                title: 'Post successfully edited!',
            });
        },
    });

    const addPost = () => {
        const topicsList = topics
            .split(',')
            .map((item) => item.replace(' ', ''))
            .filter(Boolean);

        if (story?.id) {
            editExecute({
                title,
                content,
                preview,
                image: imageUrl,
                id: story.id,
                topicsList,
            });
        } else {
            createExecute({
                title,
                content,
                preview,
                image: imageUrl,
                topicsList,
            });
        }
    };

    return (
        <div className="container space-y-10 px-0 md:grid md:grid-cols-2 md:gap-10 md:space-y-0">
            <div>
                <div className="mb-10">
                    <FileUpload
                        className="flex min-h-[145px] cursor-pointer items-center justify-center rounded border p-10"
                        setImageUrl={setImageUrl}
                        isFileLoading={isFileLoading}
                        setIsFileLoading={setIsFileLoading}
                    />
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <input
                            type="text"
                            onChange={onChangeTitle}
                            value={title}
                            placeholder="Story title"
                            className="w-full border-b py-1 pr-20 outline-none"
                        />

                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            Required*
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={preview}
                            placeholder="Story preview"
                            onChange={(e) => setPreview(e.target.value)}
                            className="w-full border-b py-1 pr-20 outline-none"
                        />

                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                            Required*
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <input
                    type="text"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    className="mb-10 block w-full border-b py-1 outline-none"
                    placeholder="Topics"
                />

                <Button
                    onClick={addPost}
                    disabled={createStatus === 'executing' || editStatus === 'executing' || isDisable}
                >
                    {story?.id ? 'Edit' : 'Publish'}
                </Button>
            </div>
        </div>
    );
};
