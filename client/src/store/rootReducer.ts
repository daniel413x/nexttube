import { combineReducers } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import api from './api';
import auth from './features/auth/authSlice';
import user from './features/user/userSlice';
import util from './features/util/utilSlice';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  api: api.reducer,
  auth,
  user,
  util,
  toastr: toastrReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
