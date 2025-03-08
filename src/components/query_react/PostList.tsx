import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://api.kungfutech.edu.vn/api/posts?type=new&page=1&size=50');
  if (!response.ok) {
    throw new Error('Lỗi khi tải bài viết');
  }
  const data = await response.json();
  return data.items; 
};

const PostList: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error instanceof Error) return <div className="text-center mt-8 text-red-500">{error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Danh sách bài viết</h1>
      <div className="space-y-6">
        {posts?.map((post: any) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <Link to={`/posts/${post.slug}`}>  
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.username} 
                  className="w-10 h-10 rounded-full"
                />
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
                  {post.topics.map((topic: any) => (
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