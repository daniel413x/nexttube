import { AUTH, LOGIN, LOGOUT, REGISTER } from '@data/consts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';
import { IAuthData, IAuthFields } from '@types';
import AuthService from '@services/authService';
import { toastError } from '@utils';

export const register = createAsyncThunk<IAuthData, IAuthFields>(
  `${AUTH}/${REGISTER}`,
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await AuthService.registration(email, password);
      toastr.success('Registration', 'Success');
      return res;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk<IAuthData, IAuthFields>(
  `${AUTH}/${LOGIN}`,
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await AuthService.login(email, password);
      console.log(res);
      toastr.success('Login', 'Success');
      return res;
    } catch (e) {
      toastError(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(`${AUTH}/${LOGOUT}`, async () => ({}));
