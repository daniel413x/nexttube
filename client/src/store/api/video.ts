import { VIDEO } from '@data/consts';
import { IVideo, IVideoDto, VideoGetResponse, VideoSearchQuery } from '@types';
import api from '.';

const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVideosBySearchTerm: builder.query<VideoGetResponse, VideoSearchQuery>({
      query: ({ ...params }: VideoSearchQuery) => ({
        url: `${VIDEO}`,
        params,
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
        responseHandler: (response) => response.text(),
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
    updateLikes: builder.mutation<IVideo, { videoId: string; userId: string }>({
      query: ({ videoId }) => ({
        method: 'PUT',
        url: `/${VIDEO}/update-likes/${videoId}`,
      }),
      invalidatesTags: (result, error, { videoId, userId }) => [
        { type: 'Video', videoId },
        { type: 'Profile', userId },
      ],
    }),
    checkUserLike: builder.query<boolean, { videoId: string; userId: string }>({
      query: ({ videoId, userId }) => `video/check-likes/${videoId}/${userId}`,
      providesTags: (result, error, { videoId, userId }) => [
        { type: 'Video', videoId },
        { type: 'Profile', userId },
      ],
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
