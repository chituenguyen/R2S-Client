export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface Post {
  id: string;           
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;    
  description: string;  
  content: string;      
  thumbnail: string;    
  author: {
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  topics: {
    id: string;
    title: string;
    slug: string;
  }[];
  bookmarks: number;
  comments: number;     
  claps: number;       
  timeRead: number;    
  views: number; 
  viewCount: number;
  isPublic: number;
  market: string;      
}