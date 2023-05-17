import { initialVideo } from '@data/state';
import { createSlice } from '@reduxjs/toolkit';
import { VideoSlice } from '@types';
import {
  setDbCount,
  setSearchInput,
  setSearchResults,
} from '@store/actions/videoActions';

const initialState: VideoSlice = initialVideo;

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setSearchResults, (state, action) => {
      state.searchResults = action.payload;
    });
    builder.addCase(setSearchInput, (state, action) => {
      state.searchInput = action.payload;
    });
    builder.addCase(setDbCount, (state, action) => {
      state.dbCount = action.payload;
    });
  },
});

export default videoSlice.reducer;
