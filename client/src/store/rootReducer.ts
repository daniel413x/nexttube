import { combineReducers } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './features/auth/authSlice';
import user from './features/user/userSlice';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth,
  user,
  toastr: toastrReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
