import { VIDEO } from '@data/consts';
import { IVideo, IVideoDto } from '@types';
import api from '.';

const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideosBySearchTerm: builder.query<IVideo[], string>({
      query: (searchTerm) => ({
        url: `${VIDEO}`,
        params: { searchTerm },
      }),
    }),
    getVideoById: builder.query<IVideo, string>({
      query: (id) => `${VIDEO}/by-id/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    getVideoPrivate: builder.query<IVideo, string>({
      query: (id) => `${VIDEO}/get-private/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    createVideo: builder.mutation<string, void>({
      query: () => ({
        method: 'POST',
        url: `/${VIDEO}`,
      }),
      invalidatesTags: () => [{ type: 'Profile' }],
    }),
    updateVideo: builder.mutation<IVideo, IVideoDto>({
      query: ({ id, ...body }) => ({
        method: 'PUT',
        url: `/${VIDEO}/${id}`,
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Video', id },
        { type: 'Profile' },
      ],
    }),
    updateViews: builder.mutation<IVideo, string>({
      query: (id) => ({
        method: 'PUT',
        url: `/${VIDEO}/update-views/${id}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    updateLikes: builder.mutation<IVideo, string>({
      query: (id) => ({
        method: 'PUT',
        url: `/${VIDEO}/update-likes/${id}`,
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    checkUserLike: builder.query<boolean, string>({
      query: (id) => `video/check-likes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Video', id }],
    }),
    deleteVideo: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: `/${VIDEO}/${id}`,
      }),
      invalidatesTags: () => [{ type: 'Video' }, { type: 'Profile' }],
    }),
  }),
});

export default videoApi;
