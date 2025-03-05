// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: {
//     name: string;
//   };
// }
export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  email: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}