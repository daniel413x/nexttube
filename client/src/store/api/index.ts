import { USER } from '@data/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IUser } from '@types';
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
  endpoints: (builder) => ({
    getProfile: builder.query<IUser, any>({
      query: () => `${USER}/profile`,
      providesTags: () => [{ type: 'Profile' }],
    }),
    subscribeToChannel: builder.mutation<boolean, string>({
      query: (channelId) => ({
        method: 'PATCH',
        url: `${USER}/subscribe/${channelId}`,
      }),
      invalidatesTags: () => [{ type: 'Profile' }],
    }),
  }),
});

export default api;
