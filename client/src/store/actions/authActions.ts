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
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await AuthService.registration(username, password);
      toastSuccess('Success', 'Registration');
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
      toastSuccess('Success', 'Login');
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
    return {};
  }
);
