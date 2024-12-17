import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, userType: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      console.log("state.userType", state.userType);
    },
    logOut: (state) => {
      state.token = null;
      state.userType = null;
    },
  },
});

export const { setToken, setUserType, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => {
  return state.auth.token;
};
export const selectUserType = (state) => {
  return state.auth.userType;
};
export default authSlice.reducer;
