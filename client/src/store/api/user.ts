import { USER } from '@data/consts';
import { IUser, IUserDto } from '@types';
import api from '.';

const userApi = api.injectEndpoints({
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
    updateUser: builder.mutation<any, IUserDto>({
      query: ({ id, ...body }) => ({
        method: 'PUT',
        url: `${USER}/${id}`,
        body,
      }),
      invalidatesTags: () => [{ type: 'Profile' }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: `${USER}/${userId}`,
      }),
      invalidatesTags: () => [{ type: 'Profile' }],
    }),
  }),
});

export default userApi;
