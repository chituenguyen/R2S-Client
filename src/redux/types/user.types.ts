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