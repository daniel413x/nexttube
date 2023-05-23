import { AUTH, LOGIN, LOGOUT, REGISTER } from '@data/consts';
import { initialUser } from '@data/state';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthData, IAuthFields } from '@types';
import AuthService from '@services/authService';
import { serializeError, toastError, toastSuccess } from '@utils';
import { setUser } from './userActions';

export const noLoading = createAction('noLoading');

export const register = createAsyncThunk<IAuthData, IAuthFields>(
  `${AUTH}/${REGISTER}`,
  async ({ username, password, email }, thunkAPI) => {
    try {
      const res = await AuthService.registration(email, username, password);
      toastSuccess('Your account was registered');
      return res;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(serializeError(e));
    }
  }
);

export const login = createAsyncThunk<IAuthData, IAuthFields>(
  `${AUTH}/${LOGIN}`,
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await AuthService.login(username, password);
      toastSuccess('You are logged in');
      return res;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(serializeError(e));
    }
  }
);

export const removeToken = createAction<void>('removeToken');

export const logout = createAsyncThunk(
  `${AUTH}/${LOGOUT}`,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(removeToken());
    thunkAPI.dispatch(setUser(initialUser));
    toastSuccess('You are logged out');
    return {};
  }
);
