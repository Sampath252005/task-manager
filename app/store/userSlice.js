// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic:
    typeof window !== "undefined"
      ? localStorage.getItem("profilePic") || "/profile.png"
      : "/profile.png",
  username: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("profilePic", action.payload);
      }
    },
    setUserInfo: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.username = "";
      state.email = "";
      state.profilePic = "/profile.png";
      localStorage.removeItem("user");
      localStorage.removeItem("profilePic");
    },
  },
});

export const { setProfilePic, setUserInfo, clearUser } = userSlice.actions;
export default userSlice.reducer;
