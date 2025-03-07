import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../../redux/slices/postSlice';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetail(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-8 text-lg font-medium">⏳ Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500 font-medium">❌ {error}</div>;
  if (!currentPost) return <div className="text-center mt-8 text-gray-500">🚫 Không tìm thấy bài viết</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Tiêu đề bài viết */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{currentPost.title}</h1>

      {/* Thông tin bài viết */}
      <div className="flex items-center justify-center text-gray-600 text-sm space-x-4 mb-6">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1 text-blue-500" />
          <span>{new Date(currentPost.createdAt).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="flex items-center">
          <FaEye className="mr-1 text-green-500" />
          <span>{currentPost.viewCount} lượt xem</span>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {currentPost.content.split('\n').map((paragraph, index) => {
          const trimmedParagraph = paragraph.trim();
          if (trimmedParagraph) {
            if (trimmedParagraph.startsWith('##')) {
              return <h2 key={index} className="text-xl font-semibold text-gray-900 mb-4">{trimmedParagraph.replace('##', '')}</h2>;
            }
            return <p key={index} className="mb-4">{trimmedParagraph}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PostDetail;
