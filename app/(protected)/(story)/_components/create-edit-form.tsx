'use client';

import { createPost } from '@/actions/post/create-post';
import { editPost } from '@/actions/post/edit-post';
import { z } from 'zod';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Post } from '@/lib/db/types';
import dynamic from 'next/dynamic';
import { forwardRef, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import 'react-quill/dist/quill.bubble.css';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => (
        <div className="px-[15px] py-3">
            <Loader />
        </div>
    ),
});

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Preview } from './preview';
import { Loader } from '@/components/shared/loader';
import { useToast } from '@/components/ui/use-toast';
import { createPostSchema, editPostSchema } from '@/lib/schemas';

type CreateValues = z.infer<typeof createPostSchema>;
type EditValues = z.infer<typeof editPostSchema>;
export type Values = CreateValues | EditValues;

export const CreateEditForm = ({ story }: { story?: Post }) => {
    const { toast } = useToast();
    const isEdit = !!story?.id;

    const [imageUrl, setImageUrl] = useState(story?.image || '');
    const [isFileLoading, setIsFileLoading] = useState(false);

    const { register, control, handleSubmit, formState } = useForm<Values>({
        mode: 'onChange',
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            title: story?.title || '',
            content: story?.content || '',
            preview: story?.preview || '',
            topics: story?.topics.map((topic) => topic.name) || [],
        },
    });

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

    const {
        dirtyFields,
        errors: { title, content },
    } = formState;

    const validTitle = isEdit ? !title?.message : dirtyFields['title'] && !title?.message;
    const validContent = isEdit ? !content?.message : dirtyFields['content'] && !content?.message;
    const disable = !validTitle || !validContent;

    const onSubmit: SubmitHandler<Values> = (data) => {
        if (isEdit) {
            editExecute({
                content: data.content,
                preview: data.preview,
                title: data.title,
                image: imageUrl,
                topics: data.topics,
                id: story.id,
            } as EditValues);
        } else {
            createExecute({
                content: data.content,
                preview: data.preview,
                title: data.title,
                image: imageUrl,
                topics: data.topics,
            } as CreateValues);
        }
    };

    return (
        <div className="py container">
            <form className="space-y-6">
                <input
                    type="text"
                    className="w-full text-4xl outline-none"
                    placeholder="Title"
                    {...register('title')}
                />

                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => <div className="min-h-[52.5px]">{<ReactQuillWithRef {...field} />}</div>}
                />

                <Dialog>
                    <DialogTrigger asChild disabled={disable}>
                        <Button>Next</Button>
                    </DialogTrigger>

                    <DialogContent className="h-full max-w-full rounded-none py-10 md:p-24">
                        <Preview
                            register={register}
                            formState={formState}
                            control={control}
                            setImageUrl={setImageUrl}
                            isFileLoading={isFileLoading}
                            setIsFileLoading={setIsFileLoading}
                        >
                            <Button
                                disabled={createStatus === 'executing' || editStatus === 'executing' || isFileLoading}
                                onClick={handleSubmit(onSubmit)}
                            >
                                {isEdit ? 'Edit' : 'Publish'}
                            </Button>
                        </Preview>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    );
};

const ReactQuillWithRef = forwardRef(function ReactQuillWithRef(props, ref) {
    return <ReactQuill {...props} theme="bubble" placeholder="Tell your story..." />;
});
