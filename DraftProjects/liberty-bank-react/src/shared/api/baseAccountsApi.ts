import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GATEWAY } from './constants.ts';

export const baseAccountsApi = createApi({
  reducerPath: 'baseAccountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: GATEWAY,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: () => ({}),
});
