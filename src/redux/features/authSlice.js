import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, userType: null, userInfo: null },
  reducers: {
    setToken: (state, action) => {
      console.log("saving token", state.userType);
      state.token = action.payload;
    },
    setUserType: (state, action) => {
      console.log("saving user type", state.userType);
      state.userType = action.payload;
    },
    setUserInfo: (state, action) => {
      console.log("saving user info", state.userInfo);
      state.userInfo = action.payload;
    },
    logOut: (state) => {
      console.log("clearing auth state");
      state.token = null;
      state.userType = null;
    },
  },
});

export const { setToken, setUserType, setUserInfo, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => {
  return state.auth.token;
};
export const selectUserType = (state) => {
  return state.auth.userType;
};
export const selectUserInfo = (state) => {
  return state.auth.userInfo;
};
export default authSlice.reducer;
