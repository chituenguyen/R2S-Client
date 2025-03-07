import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postSlice';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import { Post } from '../../redux/types/user.types';
import { FaEye, FaHeart } from 'react-icons/fa';

const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-8 text-lg font-medium">⏳ Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500 font-medium">❌ {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📜 Danh sách bài viết</h1>
      <div className="grid gap-6">
        {posts.map((post: Post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Link to={`/post/${post.id}`}>
              {/* Tác giả */}
              <div className="flex items-center gap-3 mb-3">
                <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full shadow-md" />
                <div>
                  <p className="font-medium text-gray-700">{post.author.firstName} {post.author.lastName}</p>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              {/* Tiêu đề */}
              <h2 className="text-xl font-bold hover:text-blue-600 mb-2">{post.title}</h2>

              {/* Thông tin bài viết */}
              <div className="flex gap-4 text-sm text-gray-600">
                <span>⏳ {post.timeRead} phút đọc</span>
                <span className="flex items-center gap-1"><FaEye /> {post.views}</span>
                <span className="flex items-center gap-1"><FaHeart className="text-red-500" /> {post.claps}</span>
              </div>

              {/* Tags (chủ đề) */}
              {post.topics?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.topics.map(topic => (
                    <span key={topic.id} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                      #{topic.title}
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
