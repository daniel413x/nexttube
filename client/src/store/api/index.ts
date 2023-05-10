import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootStateType } from '@store/rootReducer';
import { baseURL as baseUrl } from '@services/index';

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Video', 'Profile'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootStateType).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
  }),
  endpoints: () => ({}),
});

export default api;
