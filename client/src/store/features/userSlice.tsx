import { GUEST_USER } from '@data/state';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '@types';

const initialState: IUser = GUEST_USER;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => payload,
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
