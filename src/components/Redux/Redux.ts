import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
