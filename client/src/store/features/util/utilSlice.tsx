import { initialUtil } from '@data/state';
import { createSlice } from '@reduxjs/toolkit';
import { UtilSlice } from '@types';
import { setVideoHeight } from '@store/actions/utilActions';

const initialState: UtilSlice = initialUtil;

export const utilSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setVideoHeight, (state, action) => {
      state.videoHeight = action.payload;
    });
  },
});

export default utilSlice.reducer;
