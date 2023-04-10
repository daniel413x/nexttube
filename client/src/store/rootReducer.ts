import { combineReducers } from '@reduxjs/toolkit';
import projects from './features/projectsSlice';
import user from './features/userSlice';

const rootReducer = combineReducers({
  projects,
  user,
});

export default rootReducer;
