import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    isLoggedIn:localStorage.getItem("token")&&localStorage.length>0?true:false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token",state.token);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;

      state.token = null;
      state.userId = null;

      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout, setUserId } =authSlice.actions;
export default authSlice.reducer;
/**
 * 
 * setUserId that should:
set the payload to the state.userId
set the userId in the localStorage
setLogout that should:
set the state.token to null
set the state.userId to null
set the state.isLoggedIn to false
clear the localStorage

 */
