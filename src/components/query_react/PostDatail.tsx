import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchPostDetail = async (slug: string) => {
  const response = await fetch(`https://api.kungfutech.edu.vn/api/posts/9845516e-d039-40fb-9bea-df803d922f50`);
  if (!response.ok) {
    throw new Error('Không thể tải chi tiết bài viết');
  }
  return response.json();
};

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>(); 

  const { data: currentPost, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostDetail(slug!),
    enabled: !!slug
  });

  if (isLoading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error instanceof Error) return <div className="text-center mt-8 text-red-500">{error.message}</div>;
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
        {currentPost.content?.split('\n').map((paragraph: string, index: number) => {
          const trimmedParagraph = paragraph.trim();
          if (trimmedParagraph) {
            if (trimmedParagraph.startsWith('##')) {
              return <h2 key={index} className="text-xl font-bold my-4">{trimmedParagraph.replace('##', '')}</h2>;
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