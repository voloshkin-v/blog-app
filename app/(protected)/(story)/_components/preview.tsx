import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from '@/components/ui/use-toast';
import { createPost } from '@/actions/post/create-post';

import { Button } from '@/components/ui/button';
import { FileUpload } from '../new-story/_components/file-upload';
import { Loader } from '@/components/shared/loader';

interface Props {
    title: string;
    content: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Preview = ({ content, title, onChangeTitle }: Props) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [preview, setPreview] = useState('');

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

    const addPost = () => {
        execute({
            title,
            content,
            preview,
            image: imageUrl,
        });
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
                    Publish
                </Button>
            </div>
        </div>
    );
};
