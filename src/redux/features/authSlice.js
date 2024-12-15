import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => {
  console.log("Redux state:", state);
  state.auth.token;
};
export default authSlice.reducer;
