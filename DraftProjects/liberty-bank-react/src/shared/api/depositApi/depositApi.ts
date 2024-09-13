import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getAccessToken } from '@/shared';
import {
  IRenewalStatusRequest,
  IDepositFormRequest,
  IDepositFormResponse,
  IDepositInfoData,
  IDepositProduct,
  IInfoDepositForm,
  IUserDepositInfo,
  IUserProduct,
  IUserDepositRecall,
  IProfitCalculationResponse,
  IProfitCalculationRequest,
  IDepositHistoryProduct,
} from '.';
import { DEPOSIT_URL } from './constants';

export const depositApi = createApi({
  reducerPath: 'depositProduct',
  tagTypes: ['DepositRequest', 'DepositProducts'],
  baseQuery: fetchBaseQuery({
    baseUrl: DEPOSIT_URL.baseDeposit,
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
    getDepositProducts: builder.query<IDepositProduct[], void>({
      query: () => DEPOSIT_URL.depositProducts,
    }),
    getInfoDepositForm: builder.query<IInfoDepositForm, string>({
      query: (productId) => ({
        url: DEPOSIT_URL.depositForm,
        method: 'GET',
        params: {
          id: productId,
        },
      }),
    }),
    getDepositProductDetails: builder.query<IDepositInfoData, string>({
      query: (id) => `${DEPOSIT_URL.depositProducts}/${id}`,
    }),
    postProfitCalculation: builder.mutation<IProfitCalculationResponse, IProfitCalculationRequest>({
      query: (data) => ({
        url: DEPOSIT_URL.profitCalculation,
        method: 'POST',
        body: data,
      }),
    }),
    getUsersDeposits: builder.query<IUserProduct[], void>({
      query: () => DEPOSIT_URL.userDeposits,
      providesTags: ['DepositProducts'],
    }),
    getUserDepositProductInfo: builder.query<IUserDepositInfo, string>({
      query: (depositId) => ({
        url: DEPOSIT_URL.userDepositInfo,
        method: 'GET',
        params: {
          depositId,
        },
      }),
      providesTags: ['DepositRequest'],
    }),
    postDepositOrder: builder.mutation<IDepositFormResponse, IDepositFormRequest>({
      query: (data) => ({
        url: DEPOSIT_URL.userDeposits,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['DepositProducts'],
    }),
    postUserDepositRecall: builder.mutation<boolean, IUserDepositRecall>({
      query: (data) => ({
        url: DEPOSIT_URL.recallDeposit,
        method: 'POST',
        body: data,
      }),
    }),
    changeRenewalStatus: builder.mutation<
      Pick<IRenewalStatusRequest, 'autoRenewal'>,
      IRenewalStatusRequest
    >({
      query: ({ autoRenewal, depositId }) => ({
        url: DEPOSIT_URL.userDeposits,
        method: 'PATCH',
        params: {
          autoRenewal,
          id: depositId,
        },
      }),
      invalidatesTags: ['DepositRequest'],
    }),
    getDepositsHistory: builder.query<IDepositHistoryProduct[], void>({
      query: () => DEPOSIT_URL.depositsHistory,
    }),
  }),
});

export const {
  useGetDepositProductsQuery,
  usePostDepositOrderMutation,
  usePostUserDepositRecallMutation,
  useGetInfoDepositFormQuery,
  useGetUsersDepositsQuery,
  useGetDepositProductDetailsQuery,
  useGetUserDepositProductInfoQuery,
  useChangeRenewalStatusMutation,
  usePostProfitCalculationMutation,
  useGetDepositsHistoryQuery,
} = depositApi;
