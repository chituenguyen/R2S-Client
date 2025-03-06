import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postSlice';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import { Post } from '../../redux/types/user.types';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách bài viết</h1>
      <div className="space-y-6">
        {posts.map((post: Post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <Link to={`/post/${post.id}`}>
              <div className="flex items-center gap-3 mb-3">
                <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full"/>
                <div>
                  <p className="font-medium">{post.author.firstName} {post.author.lastName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-bold hover:text-blue-600 mb-2">{post.title}</h2>
              
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{post.timeRead} phút đọc</span>
                <span>{post.views} lượt xem</span>
                <span>{post.claps} claps</span>
              </div>

              {post.topics?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.topics.map(topic => (
                    <span key={topic.id} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                      {topic.title}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;