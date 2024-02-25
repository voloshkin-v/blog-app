import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
    return (
        <div>
            <Loader className="m-auto animate-spin-slow" />
        </div>
    );
};

export default Loading;
