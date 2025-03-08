export interface PostResponse {
    total: number;
    items: Post[];
  }
  
  export interface Post {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    description?: string;
    content?: string;
    thumbnail?: string;
    author?: {
      username: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    viewCount?: number;
    isPublic?: number;
    createdById?: string;
    market?: string;
  }