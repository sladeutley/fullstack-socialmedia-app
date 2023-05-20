import { createSlice } from "@reduxjs/toolkit";

// this essentially will be the state that will be stored in our global state (this data will be accessible throughout our entire app, making it so we don't have to pass in states and properties throughout our components)
const initialState = {
  mode: "light", //dark mode and light mode
  user: null, //auth info
  token: null, //auth info
  posts: [],
};

export const authSlice = createSlice({
  name: "auth", //represents auth workflow
  initialState, //passing initial state into initial state
  reducers: { //reducers are actions - essentially functions - functions that involve modifying the global state
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // I don't really understand what's below - maybe ask chatgpt what this coe does
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends; //sets friends into local sate
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; //if post id is equal to current postid we're sending into this function, return the post that we want. Only return post we want
        return post; //otherwise return what we currently have
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;