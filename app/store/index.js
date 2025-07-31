import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    user: userReducer,
    search: searchReducer,
    theme: themeReducer,
  },
});
