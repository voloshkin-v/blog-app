// import { useState } from 'react';
// import { useAction } from 'next-safe-action/hooks';
// import { toast } from '@/components/ui/use-toast';
// import { createPost } from '@/actions/post/create-post';
// import { editPost } from '@/actions/post/edit-post';

// import { Button } from '@/components/ui/button';
// import { FileUpload } from './file-upload';
// import type { Post } from '@/lib/db/types';

// interface Props {
//     title: string;
//     content: string;
//     onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     story?: Post;
// }

// export const Preview = ({ content, title, onChangeTitle, story }: Props) => {
//     const [imageUrl, setImageUrl] = useState(story?.image || '');
//     const [isFileLoading, setIsFileLoading] = useState(false);
//     const [topics, setTopics] = useState(story?.topics.map((item) => item.name).join(', ') || '');
//     const [preview, setPreview] = useState(story?.preview || '');

//     const isDisable = isFileLoading || !preview || !title || !content;

//     const { execute: createExecute, status: createStatus } = useAction(createPost, {
//         onError: (error) => {
//             toast({
//                 title: 'Something went wrong!',
//                 description: 'Post could not be added',
//                 variant: 'destructive',
//             });
//         },
//         onSuccess: (data) => {
//             toast({
//                 title: 'Post created!',
//             });
//         },
//     });

//     const { execute: editExecute, status: editStatus } = useAction(editPost, {
//         onError: (error) => {
//             toast({
//                 title: 'Something went wrong!',
//                 description: 'Post could not be added',
//                 variant: 'destructive',
//             });
//         },
//         onSuccess: (data) => {
//             toast({
//                 title: 'Post successfully edited!',
//             });
//         },
//     });

//     const addPost = () => {
//         const topicsList = topics
//             .split(',')
//             .map((item) => item.replace(' ', ''))
//             .filter(Boolean);

//         if (story?.id) {
//             editExecute({
//                 title,
//                 content,
//                 preview,
//                 image: imageUrl,
//                 id: story.id,
//                 topicsList,
//             });
//         } else {
//             createExecute({
//                 title,
//                 content,
//                 preview,
//                 image: imageUrl,
//                 topicsList,
//             });
//         }
//     };

//     return (
//         <div className="container space-y-10 px-0 md:grid md:grid-cols-2 md:gap-10 md:space-y-0">
//             <div>
//                 <div className="mb-10">
//                     <FileUpload
//                         className="flex min-h-[145px] cursor-pointer items-center justify-center rounded border p-10"
//                         setImageUrl={setImageUrl}
//                         isFileLoading={isFileLoading}
//                         setIsFileLoading={setIsFileLoading}
//                     />
//                 </div>

//                 <div className="space-y-2">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             onChange={onChangeTitle}
//                             value={title}
//                             placeholder="Story title"
//                             className="w-full border-b py-1 pr-20 outline-none"
//                         />

//                         <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
//                             Required*
//                         </span>
//                     </div>
//                     <div className="relative">
//                         <input
//                             type="text"
//                             value={preview}
//                             placeholder="Story preview"
//                             onChange={(e) => setPreview(e.target.value)}
//                             className="w-full border-b py-1 pr-20 outline-none"
//                         />

//                         <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
//                             Required*
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <input
//                     type="text"
//                     value={topics}
//                     onChange={(e) => setTopics(e.target.value)}
//                     className="mb-10 block w-full border-b py-1 outline-none"
//                     placeholder="Topics"
//                 />

//                 <Button
//                     onClick={addPost}
//                     disabled={createStatus === 'executing' || editStatus === 'executing' || isDisable}
//                 >
//                     {story?.id ? 'Edit' : 'Publish'}
//                 </Button>
//             </div>
//         </div>
//     );
// };

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { UseFormRegister, FormState, Controller, Control } from 'react-hook-form';
import { Values } from './create-edit-form';

import { FileUpload } from './file-upload';
import { ErrorFormMessage } from './error-form-message';

interface Props {
    formState: FormState<Values>;
    register: UseFormRegister<Values>;
    children: React.ReactNode;
    control: Control<Values>;
    isFileLoading: boolean;
    setIsFileLoading: (value: boolean) => void;
    setImageUrl: (value: string) => void;
}

export const Preview = ({
    register,
    formState,
    children,
    control,
    setImageUrl,
    isFileLoading,
    setIsFileLoading,
}: Props) => {
    const { errors } = formState;
    const invalidTitle = !!errors.title?.message;
    const invalidPreview = !!errors.preview?.message;

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
                    <div>
                        <div className={`relative ${invalidTitle ? 'text-red-500' : ''}`}>
                            <input
                                type="text"
                                placeholder="Story title"
                                className={`w-full border-b py-1 pr-20 outline-none ${invalidTitle ? 'border-red-500' : ''}`}
                                {...register('title')}
                            />

                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs">Required*</span>
                        </div>

                        <ErrorFormMessage message={errors.title?.message} />
                    </div>

                    <div>
                        <div className={`relative ${invalidPreview ? 'text-red-500' : ''}`}>
                            <input
                                type="text"
                                placeholder="Story preview"
                                className={`w-full border-b py-1 pr-20 outline-none ${invalidPreview ? 'border-red-500' : ''}`}
                                {...register('preview')}
                            />

                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs">Required*</span>
                        </div>

                        <ErrorFormMessage message={errors.preview?.message} />
                    </div>
                </div>
            </div>

            <div>
                <Controller
                    name="topics"
                    control={control}
                    render={({ field }) => (
                        <div className="min-h-[52.5px]">
                            <TagsInput {...field} value={field.value || []} />
                        </div>
                    )}
                />

                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};
