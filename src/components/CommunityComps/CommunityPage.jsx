"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CommunityGetComp = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/getCommunityPosts');
            const data = await response.json();
            if (response.ok) {
                setPosts(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while fetching posts.');
        }
    };

    return (
      <div className=' bg-[#331D2C] p-5 '>
            <h1 className="text-4xl font-bold text-center text-white mb-6">Community Page</h1>
            <div className="flex h-10 justify-center mt-8">
                <Link className="py-2 px-4 bg-amber-900 text-white font-semibold rounded-md shadow-md hover:bg-amber-950 transition duration-300" href={'/addCommunityPost'}>
                        Add New Post  
                </Link>
            </div>
        <div className="min-h-screen  p-8">
            {error && <p className="text-red-500 text-center">{error}</p>}
         
            <div className="flex flex-wrap justify-center gap-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-[#3F2E3E] p-4 rounded-lg custom-scrollbar  h-[20vh] break-words overflow-y-auto shadow-md w-64">
                        <p className="text-white mb-2">{post.content}</p>
                        <span className="text-gray-300 text-sm">By-{post.user}</span>
                        <br />
                        <span className="text-gray-300 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                ))}
            </div>
         
        </div>
        </div>
    );
};

export default CommunityGetComp;
