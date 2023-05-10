import { initialUtil } from '@data/state';
import { createSlice } from '@reduxjs/toolkit';
import { UtilSlice } from '@types';
import { setUserDeletion, setVideoHeight } from '@store/actions/utilActions';

const initialState: UtilSlice = initialUtil;

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setVideoHeight, (state, action) => {
      state.videoHeight = action.payload;
    });
    builder.addCase(setUserDeletion, (state, action) => {
      // prevent rtk query from auto-fetching a deleted user
      state.userDeletion = action.payload;
    });
  },
});

export default utilSlice.reducer;
