import { AUTH, LOGIN, LOGOUT, REGISTER } from '@data/consts';
import { initialUser } from '@data/state';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';
import { IAuthData, IAuthFields } from '@types';
import AuthService from '@services/authService';
import { serializeError, toastError } from '@utils';
import { setUser } from './userActions';

export const noLoading = createAction('noLoading');

export const register = createAsyncThunk<IAuthData, IAuthFields>(
  `${AUTH}/${REGISTER}`,
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await AuthService.registration(username, password);
      toastr.success('Registration', 'Success');
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
      toastr.success('Login', 'Success');
      return res;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(serializeError(e));
    }
  }
);

export const logout = createAsyncThunk(
  `${AUTH}/${LOGOUT}`,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(initialUser));
    return {};
  }
);
