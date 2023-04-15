import { createAction } from '@reduxjs/toolkit';
import { UserSlice } from '@types';

// eslint-disable-next-line import/prefer-default-export
export const setUser = createAction<UserSlice>('setUser');
