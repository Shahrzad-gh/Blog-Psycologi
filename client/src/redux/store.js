import { configureStore } from "@reduxjs/toolkit";

import postsReducer, { postsFetch } from "./postsSlice";
import { postsApi } from "./postsApi";
import { catsApi } from "./catsApi";
import { authSlice } from "./authSlice";
export const store = configureStore({
  reducer: {
    //posts: postsReducer,
    //auth: authReducer,
    user: authSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(catsApi.middleware),
});

store.dispatch(postsFetch());
//setupListeners.apply(store.dispatch);
