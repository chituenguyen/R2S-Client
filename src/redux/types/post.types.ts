// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: {
//     name: string;
//   };
// }
interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  author: Author;
  topics: Topic[];
  bookmarks: number;
  comments: number;
  claps: number;
  timeRead: number;
  views: number;
};

interface Author {
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

interface Topic {
  id: string;
  title: string;
  slug: string;
};
interface postPrarams {
  type: 'new' | 'popular' | 'trending';
  page: number;
  size: number;
};

interface postState {
  posts: Post[];
  loading: boolean;
  error: string | null;
};
interface FetchPostsResponse {
  total: number;
  items: Post[];
}

interface postDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  content: string;
  viewCount: number;
  isPublic: number;
  createdById: string;
  market: string;
}
interface postDetailState{
  postDetail: postDetail[];
  loading: boolean;
  error: string | null;
}

export type { Post, Author, Topic, postState, postPrarams,FetchPostsResponse,postDetail,postDetailState };
  

