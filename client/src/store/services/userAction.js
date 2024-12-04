import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signupAPI = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/register`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
});

const loginAPI = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/login`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
});

const logoutAPI = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/logout`,
      {},
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
});

const currentUserAPI = createAsyncThunk("auth/currentUser", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/current-user`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error;
  }
});

const googleAuthAPI = createAsyncThunk("auth/google", async () => {
  window.open("http://localhost:8000/api/v1/google/callback", "_self");
});

const googleAuthSuccessAPI = createAsyncThunk(
  "auth/googleAuthSuccessAPI",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/login/success`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return error;
    }
  }
);

export {
  signupAPI,
  loginAPI,
  logoutAPI,
  currentUserAPI,
  googleAuthAPI,
  googleAuthSuccessAPI,
};
