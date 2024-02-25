'use client';

import { create } from '@/actions/post';
import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NewStoryPage = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [topics, setTopics] = useState('');

    const handleSubmit = async () => {
        await create();
    };

    return (
        <div className="py container">
            <input type="text" placeholder="Title" className="text-4xl outline-none" />

            <div>
                <Button variant="outline" size="icon">
                    <Plus />
                </Button>

                <div></div>
            </div>

            <ReactQuill
                theme="bubble"
                value={value}
                onChange={setValue}
                placeholder="Tell your story..."
                className="quill"
            />

            <div className="space-y-2">
                <p>Add or change topics (up to 5), separated by a comma, so readers know what your story is about</p>

                <Input value={topics} onChange={(e) => setTopics(e.target.value)} placeholder="topics" />
            </div>

            <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
};

export default NewStoryPage;
