import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { Post } from '../../redux/types/post.types';
import { fetchPosts } from '../../redux/slices/postSlice';

const PostList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error } = useAppSelector((state) => state.posts);
    console.log(typeof posts)
    console.log(posts)
    console.log("PostList: posts", posts);
    useEffect(() => {
        dispatch(fetchPosts({ type: 'new', page: 1, size: 50 }));
    }, [dispatch]); 

    const Skeleton = () => (
        <div className="animate-pulse">
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
    const ErrorMessage = () => (
        <div className="p-4 text-red-500 bg-red-100 rounded-lg">
            <p className="text-center">{error}</p>  
        </div>
    );
        const PostCard: React.FC<{ post: Post }> = ({ post }) => (
            <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>
    );
    return (
        <div>
            <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-6">Post List</h1>
            {loading ? (
                <Skeleton />
                ) : error ? (
            <ErrorMessage />
                ) : (
            posts.map((items: Post) => (
              <PostCard key={items.id} post={items} />
            ))
            )}
        </div>

        </div>
    )};
     
    export default PostList;