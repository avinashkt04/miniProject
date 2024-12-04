import { createSlice } from "@reduxjs/toolkit";
import { currentUserAPI, googleAuthSuccessAPI, loginAPI, logoutAPI, signupAPI } from "../services/userAction";

const initialState = {
  status: false,
  userInfo: {},
  loading: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.message = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAPI.pending, (state, action) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(signupAPI.fulfilled, (state, action) => {
        state.status = action.payload.success;
        state.userInfo = action.payload.data;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(signupAPI.rejected, (state, action) => {
        state.status = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(loginAPI.pending, (state, action) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.status = action.payload.success;
        state.userInfo = action.payload.data;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.status = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(logoutAPI.pending, (state, action) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(logoutAPI.fulfilled, (state, action) => {
        state.status = !action.payload.success;
        state.userInfo = action.payload.data;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(logoutAPI.rejected, (state, action) => {
        state.status = !action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(currentUserAPI.pending, (state, action) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(currentUserAPI.fulfilled, (state, action) => {
        state.status = action.payload.success;
        state.userInfo = action.payload.data;
        state.message = null;
        state.loading = false;
      })
      .addCase(currentUserAPI.rejected, (state, action) => {
        state.status = !action.payload.success;
        state.message = null;
        state.loading = false;
      })
      .addCase(googleAuthSuccessAPI.pending, (state, action) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(googleAuthSuccessAPI.fulfilled, (state, action) => {
        state.status = action.payload.success;
        state.userInfo = action.payload.data.user;
        state.message = null
        state.loading = false;
      })
      .addCase(googleAuthSuccessAPI.rejected, (state, action) => {
        state.status = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
  },
});

export const {resetUserState} = userSlice.actions

export default userSlice.reducer;
