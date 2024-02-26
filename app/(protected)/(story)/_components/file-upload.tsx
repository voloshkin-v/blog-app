'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash } from 'lucide-react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '@/lib/firebase';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader } from '@/components/shared/loader';

interface FileWithPreview extends File {
    preview: string;
}

interface Props {
    className: string;
    setImageUrl: (url: string) => void;
    isFileLoading: boolean;
    setIsFileLoading: (value: boolean) => void;
}

const storage = getStorage(app);

export const FileUpload = ({ className, setImageUrl, setIsFileLoading, isFileLoading }: Props) => {
    const [file, setFile] = useState<FileWithPreview | null>(null);

    const onDrop = useCallback(
        <T extends File>(acceptedFiles: T[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
        },
        [setFile],
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': [],
        },
    });

    useEffect(() => {
        if (!file) return;

        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'images/' + name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setIsFileLoading(true);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    toast({
                        title: 'Image uploaded!',
                    });

                    setIsFileLoading(false);
                    setImageUrl(downloadURL);
                    console.log('File available at', downloadURL);
                });
            },
        );
    }, [file, setImageUrl, setIsFileLoading]);

    const onDelete = () => {
        setFile(null);
        setImageUrl('');
    };

    if (file) {
        return (
            <div className="relative h-[145px] w-full">
                {isFileLoading && (
                    <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-white opacity-75">
                        <Loader>Uploading</Loader>
                    </div>
                )}
                <Image
                    src={file.preview}
                    fill
                    alt="Post image preview"
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                    className="h-[145px] w-full object-cover"
                />

                <Button variant="secondary" size="icon" className="absolute right-2 top-2" onClick={onDelete}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div
                {...getRootProps({
                    className,
                })}
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                    <p>Drop your files here ...</p>
                ) : (
                    <p>Drag drop some files here, or click to select files (Images only)</p>
                )}
            </div>
        </div>
    );
};
