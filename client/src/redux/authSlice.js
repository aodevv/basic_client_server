import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authUser = createAsyncThunk(
  "users/authUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3090/signup", { email, password });
    return response.data.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
      
    }
    
  }
);

const initialState = {
  authenticated: "",
  status: "idle",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_user: (state) => {
      state.authenticated = "yes";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(authUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(authUser.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = "succeeded";
        state.authenticated = action.payload
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;

// Action creators are generated for each case reducer function
export const { auth_user } = authSlice.actions;

export default authSlice.reducer;
