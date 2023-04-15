import { initialAuth } from '@data/state';
import { createSlice } from '@reduxjs/toolkit';
import { AuthSlice } from '@types';
import { login, logout, register } from '../../actions/authActions';

const initialState: AuthSlice = initialAuth;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload.accessToken;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.accessToken = '';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload.accessToken;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.accessToken = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = '';
      });
  },
});

export default authSlice.reducer;
