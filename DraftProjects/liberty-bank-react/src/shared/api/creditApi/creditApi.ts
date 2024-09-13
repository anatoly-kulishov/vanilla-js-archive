import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_STATUSES, getAccessToken } from '@/shared';
import { CREDIT_URL } from './constants';
import {
  ICreditProduct,
  ICreditInfo,
  IInfoCreditForm,
  ICreditFormResponse,
  ICreditFormRequest,
  ICreditProductDetails,
  ICreditRequestsCount,
  ICurrentCredit,
  ICreditRequest,
  IWithdrawCreditResponse,
  ICreditDebtInfo,
  IReportCreditRequest,
  ICreditHistoryProduct,
} from '.';

export const creditApi = createApi({
  reducerPath: 'creditApi',
  tagTypes: ['CreditRequest', 'CreditRequestsCount'],
  baseQuery: fetchBaseQuery({
    baseUrl: CREDIT_URL.baseCredit,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCreditProducts: builder.query<ICreditProduct[], void>({
      query: () => CREDIT_URL.creditProducts,
    }),
    getCreditProductDetails: builder.query<ICreditProductDetails, string>({
      query: (creditId) => ({
        url: `${CREDIT_URL.creditProducts}/${creditId}`,
        method: 'GET',
        params: {
          creditId,
        },
      }),
    }),
    getInfoCreditForm: builder.query<IInfoCreditForm, string>({
      query: (id) => ({
        url: CREDIT_URL.creditProductsForm,
        method: 'GET',
        params: {
          id,
        },
      }),
    }),
    getUserCreditProduct: builder.query<ICreditInfo[], void>({
      query: () => CREDIT_URL.userCreditProducts,
    }),
    getCurrentCredit: builder.query<ICurrentCredit, string>({
      query: (id) => ({
        url: `${CREDIT_URL.userCreditProducts}/${id}`,
        method: 'GET',
      }),
    }),
    getCreditDebtInfo: builder.query<ICreditDebtInfo, string>({
      query: (creditId) => ({
        url: `${CREDIT_URL.userCreditProducts}/${creditId}/debt`,
        method: 'GET',
        params: {
          creditId,
        },
      }),
    }),
    getCreditRequests: builder.query<ICreditRequest[], void>({
      query: () => CREDIT_URL.creditRequests,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'CreditRequest' as const, id })),
              { type: 'CreditRequest', id: 'LIST' },
            ]
          : [{ type: 'CreditRequest', id: 'LIST' }],
    }),
    postCreditOrder: builder.mutation<ICreditFormResponse, ICreditFormRequest>({
      query: (data) => ({
        url: CREDIT_URL.creditRequests,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CreditRequest', 'CreditRequestsCount'],
    }),
    withdrawCreditRequest: builder.mutation<IWithdrawCreditResponse, string>({
      query: (id) => ({
        url: `${CREDIT_URL.creditRequests}/${id}`,
        method: 'DELETE',
        params: {
          status: REQUEST_STATUSES.WITHDRAWN,
        },
      }),
      invalidatesTags: ['CreditRequest', 'CreditRequestsCount'],
    }),
    getUserCreditRequestsCount: builder.query<number, void>({
      query: () => CREDIT_URL.creditRequestsCount,
      transformResponse: (res: ICreditRequestsCount) => res.count,
      providesTags: ['CreditRequestsCount'],
    }),
    getUserCreditHistory: builder.query<ICreditHistoryProduct[], void>({
      query: () => CREDIT_URL.userCreditsHistory,
    }),
    getReportCredit: builder.query<IReportCreditRequest, number>({
      query: (id) => ({
        url: CREDIT_URL.creditRequestsReport,
        method: 'GET',
        params: {
          id,
        },
      }),
    }),
  }),
});

export const {
  useGetCreditProductsQuery,
  useGetCreditRequestsQuery,
  useGetUserCreditProductQuery,
  useGetCreditProductDetailsQuery,
  useGetCreditDebtInfoQuery,
  useWithdrawCreditRequestMutation,
  useGetInfoCreditFormQuery,
  useLazyGetInfoCreditFormQuery,
  usePostCreditOrderMutation,
  useGetUserCreditRequestsCountQuery,
  useGetCurrentCreditQuery,
  useGetReportCreditQuery,
  useGetUserCreditHistoryQuery,
} = creditApi;
