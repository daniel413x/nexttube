import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProject } from '@types';

const initialState: IProject[] = [];

export const projectsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, { payload }: PayloadAction<IProject[]>) => {
      console.log(payload);
      return payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
