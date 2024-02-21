import { Loader } from 'lucide-react';

const PostLoading = () => {
    return (
        <div className="flex justify-center">
            <Loader className="animate-spin-slow" />
        </div>
    );
};

export default PostLoading;
