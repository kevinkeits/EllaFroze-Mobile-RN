// authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://ellafroze.com/api/external/doLogin', payload);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      return token;
    } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload as string;
    });
  },
});

export const { logoutUser } = authSlice.actions;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
