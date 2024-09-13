import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/dist/query/react';
import { MAX_RETRIES, PAYMENTS_URL } from './constants';
import { ICREATE_SELECTED, ICREATE_SELECTED_RESPONSE } from './interfaces';

export const paymentsApi = createApi({
  reducerPath: 'paymentsService',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: PAYMENTS_URL.baseInsurance,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    { maxRetries: MAX_RETRIES },
  ),
  endpoints: (builder) => ({
    createSelectedPayment: builder.mutation<ICREATE_SELECTED_RESPONSE, ICREATE_SELECTED>({
      query: (body) => ({
        url: PAYMENTS_URL.createSelected,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateSelectedPaymentMutation } = paymentsApi;
