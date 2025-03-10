import { Link, useParams } from "react-router-dom";
import { usePostDetail, usePosts } from "../../redux/hooks/usePosts";

interface Author {
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  author: Author;
  content?: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) return <p className="text-red-500 text-center">Invalid post ID</p>;
  
  const { data: posts } = usePosts();
  const initialData = posts?.find((post: Post) => post.id === id) ?? {};

  const { data: post } = usePostDetail(id, initialData);
  
  if (!post) return <p className="text-center text-red-500">Post not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
       <div className="mb-4">
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{post?.title}</h1>
      {post?.description ? (
        <p className="text-gray-700">{post.description}</p>
      ) : (
        <p className="text-gray-500 italic">Đang tải...</p>
      )}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Nội dung bài viết</h2>
        {post?.content ? (
            <div>
                <div className="text-gray-700 space-y-2">
                    {post.content.split("\n").map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                        ))}
                </div>
            </div> 
        ) : (
        <p className="text-gray-500 italic">Đang tải...</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

