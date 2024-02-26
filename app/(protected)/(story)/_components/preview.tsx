import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from '@/components/ui/use-toast';
import { createPost } from '@/actions/post/create-post';
import { editPost } from '@/actions/post/edit-post';
import { Post } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { FileUpload } from './file-upload';

interface Props {
    title: string;
    content: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    story?: Post;
}

export const Preview = ({ content, title, onChangeTitle, story }: Props) => {
    const [imageUrl, setImageUrl] = useState(story?.image || '');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [preview, setPreview] = useState(story?.preview || '');

    const isDisable = isFileLoading || !preview || !title || !content;

    const { execute, status } = useAction(createPost, {
        onError: (error) => {
            toast({
                title: 'Something went wrong!',
                description: 'Post could not be added',
                variant: 'destructive',
            });
        },
        onSuccess: (data) => {
            console.log(data);
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
            console.log(data);
        },
    });

    const addPost = () => {
        if (story?.id) {
            editExecute({
                title,
                content,
                preview,
                image: imageUrl,
                id: story.id,
            });
        } else {
            execute({
                title,
                content,
                preview,
                image: imageUrl,
            });
        }
    };

    return (
        <div className="container grid grid-cols-2 gap-10">
            <div>
                <div className="mb-10">
                    <FileUpload
                        className="flex h-[145px] cursor-pointer items-center rounded border p-10"
                        setImageUrl={setImageUrl}
                        isFileLoading={isFileLoading}
                        setIsFileLoading={setIsFileLoading}
                    />
                </div>

                <div className="space-y-2">
                    <div>
                        <input
                            type="text"
                            onChange={onChangeTitle}
                            value={title}
                            placeholder="Story title"
                            className="w-full border-b py-1 outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={preview}
                            placeholder="Story preview"
                            onChange={(e) => setPreview(e.target.value)}
                            className="w-full border-b py-1 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div>
                <Button onClick={addPost} disabled={status === 'executing' || isDisable}>
                    {story?.id ? 'Edit' : 'Publish'}
                </Button>
            </div>
        </div>
    );
};
