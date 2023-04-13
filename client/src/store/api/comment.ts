import { COMMENT } from '@data/consts';
import { IComment, ICommentDto } from '@types';
import api from '.';

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<IComment, ICommentDto>({
      query: (body) => ({
        method: 'POST',
        url: COMMENT,
        body,
      }),
      invalidatesTags: (result, error, { videoId }) => [
        { type: 'Video', id: videoId },
      ],
    }),
  }),
});

export default commentApi;
