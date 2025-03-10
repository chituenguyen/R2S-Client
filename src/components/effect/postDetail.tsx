import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { postDetail } from '../../redux/types/post.types';
import {fetchPostDetail} from '../../redux/slices/postDetailSlice';


const PostDetail: React.FC = () => {
    const dispatch = useAppDispatch();
    const { postDetail, loading, error } = useAppSelector((state) => state.postDetail);
    console.log('ascd',postDetail)
    useEffect(() => {
            dispatch(fetchPostDetail());
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
    return(
        <div>
            <h1 className="text-2xl font-bold mb-6">Post List</h1>
            {loading ? (
                <Skeleton />
                ) : error ? (
            <ErrorMessage />
                ) : (
            <div>
                {postDetail.map((post) => (
                    <div key={post.id}>{post.title}</div>
                ))}
            </div>
            )}
        </div>
  )};


export default PostDetail;