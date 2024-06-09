"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddCommunityPostPage = ({email}) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return;

        try {
            const response = await fetch('/api/AddCommunityPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content,email })
            });
            const data = await response.json();
            if (response.ok) {
                router.push('/community'); // Redirect to community page after successful post
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while submitting your post.');
        }
    };

    return (
        <div className="min-h-screen bg-[#331D2C] p-8">
            <h1 className="text-4xl font-bold text-center text-white mb-6">Add New Community Post</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your idea or tip..."
                    className="w-full p-4 rounded-lg shadow-md border bg-amber-950 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button type="submit" className="block w-full mt-4 py-2 px-4 bg-amber-900 text-white font-semibold rounded-md shadow-md hover:bg-amber-700 transition duration-300">
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddCommunityPostPage;
