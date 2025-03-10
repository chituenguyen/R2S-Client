import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchPostDetail } from "../api/postApi";

export const usePosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
};

export const usePostDetail = (id: string, initialData?: any) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetail(id),
    initialData,
  });
};
