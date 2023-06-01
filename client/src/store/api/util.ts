import { UTIL } from '@data/consts';
import api from '.';

const utilApi = api.injectEndpoints({
  endpoints: (builder) => ({
    ping: builder.query({
      query: () => ({
        method: 'POST',
        url: `${UTIL}/ping`,
      }),
    }),
  }),
});

export default utilApi;
