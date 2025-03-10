import axios from "axios";

export const fetchPosts = async () => {
  const { data } = await axios.get("/api/posts?type=new&page=1&size=50");
  return data.items;
};

export const fetchPostDetail = async (postId: string) => {
  const { data } = await axios.get(`/api/posts/${postId}`);
  return data;
};
