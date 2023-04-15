import { initialUser } from '@data/state';
import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '@types';
import { setUser } from '@store/actions/userActions';

const initialState: UserSlice = initialUser;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => action.payload);
  },
});

export default userSlice.reducer;
