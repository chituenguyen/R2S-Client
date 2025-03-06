import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetail } from '../../redux/slices/postSlice';
import { RootState } from '../../redux/store';
import { AppDispatch } from '../../redux/store';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentPost, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetail(id));
    }
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!currentPost) return <div className="text-center mt-8">Không tìm thấy bài viết</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6">{currentPost.title}</h1>
      
      <div className="mb-4 text-sm text-gray-600">
        <span>Ngày đăng: {new Date(currentPost.createdAt).toLocaleDateString('vi-VN')}</span>
        <span className="mx-2">•</span>
        <span>{currentPost.viewCount} lượt xem</span>
      </div>

      <div className="prose max-w-none">
        {currentPost.content.split('\n').map((paragraph, index) => {
          const trimmedParagraph = paragraph.trim();
          if (trimmedParagraph) {
            if (trimmedParagraph.startsWith('##')) {
              return <p key={index} className="mb-4 font-bold text-xl">{trimmedParagraph}</p>;
            }
            return <p key={index} className="mb-4 text-justify">{trimmedParagraph}</p>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PostDetail;