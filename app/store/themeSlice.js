// store/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setDarkMode, toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
