import { Link } from "react-router-dom";
import { usePosts } from "../../redux/hooks/usePosts";

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
}

const PostList = () => {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p className="text-center text-blue-500 animate-pulse">Loading posts...</p>;
  if (isError || !posts) return <p className="text-center text-blue-500 animate-pulse">Error loading posts!</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📌 Danh sách bài viết</h1>
      <div className="space-y-2">
      {Array.isArray(posts) && posts.length > 0 ? (
        <ul>
          {posts.map((post: Post) => (
            <li 
            key={post.id}
            className="border p-3 rounded-md shadow-sm hover:shadow-md transition duration-200"
            >
              <Link to={`/post/${post.id}`} className="text-blue-600 font-semibold hover:underline">{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
      </div>
    </div>
  );
};

export default PostList;
