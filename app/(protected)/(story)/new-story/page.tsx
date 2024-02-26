// 'use client';

import { CreateEditForm } from '../_components/create-edit-form';

// import { signOut } from '@/auth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { Suspense, useEffect, useState } from 'react';
// import 'react-quill/dist/quill.bubble.css';
// import { Plus } from 'lucide-react';
// import dynamic from 'next/dynamic';

// // FIREBASE
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { app } from '@/lib/firebase';
// import { FileUpload } from './_components/file-upload';
// import { useAction } from 'next-safe-action/hooks';
// import { createPost } from '@/actions/post/create-post';
// import { useToast } from '@/components/ui/use-toast';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <Loader /> });
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import { Preview } from '../_components/preview';
// import { Loader } from '@/components/shared/loader';

// const NewStoryPage = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

//     const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.target.value);
//     };

//     return (
//         <div className="py container space-y-6">
//             <input
//                 type="text"
//                 value={title}
//                 onChange={handleTitleChange}
//                 placeholder="Title"
//                 className="w-full text-4xl outline-none"
//             />

//             <div className="min-h-[52px]">
//                 <ReactQuill
//                     theme="bubble"
//                     value={content}
//                     onChange={setContent}
//                     placeholder="Tell your story..."
//                     className="quill"
//                 />
//             </div>

//             <Dialog>
//                 <DialogTrigger asChild>
//                     <Button>Publish</Button>
//                 </DialogTrigger>

//                 <DialogContent className="h-full max-w-full rounded-none p-24">
//                     <Preview title={title} onChangeTitle={handleTitleChange} content={content} />
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default NewStoryPage;

const NewStoryPage = () => {
    return <CreateEditForm />;
};

export default NewStoryPage;
