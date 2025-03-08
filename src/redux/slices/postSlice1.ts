import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../types/post.style";

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
});

export default postSlice.reducer;
