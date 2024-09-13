import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IChangeStatusResponse,
  IChangeStatusArgs,
  IAccount,
  IGetAllAccountsArgs,
  ICreateAccountArgs,
  IAccountInfo,
  IChangeName,
  IResponseName,
  IChangeIsMain,
  IResponseIsMain,
  IRequisitesApiResponse,
  IGetActiveAccountsByCurrencyArgs,
  IActiveAccountsByCurrency,
} from './model/types';
import { ACCOUNTS_URL } from './model/constants';

export const accountsApi = createApi({
  reducerPath: 'baseAccountsApi',
  tagTypes: ['AllAccounts'],
  baseQuery: fetchBaseQuery({
    baseUrl: ACCOUNTS_URL.baseAccounts,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (build) => ({
    getAllAccounts: build.query<IAccount, IGetAllAccountsArgs>({
      query: ({ page, size, customerId, id, statuses, sort }) => ({
        url: ACCOUNTS_URL.userAccounts,
        headers: { 'X-Customer-Id': customerId },
        params: { page, size, id, statuses, sort },
      }),
      providesTags: ['AllAccounts'],
    }),
    getActiveAccountsByCurrency: build.query<
      IActiveAccountsByCurrency,
      IGetActiveAccountsByCurrencyArgs
    >({
      query: ({ currency, page, size, customerId }) => ({
        url: `${ACCOUNTS_URL.activeUserAccounts}/${customerId}`,
        params: { page, size, currency },
      }),
    }),
    changeAccountStatus: build.mutation<IChangeStatusResponse, IChangeStatusArgs>({
      query: ({ id, status }) => ({
        url: `${ACCOUNTS_URL.userAccounts}/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['AllAccounts'],
    }),
    createCurrentAccount: build.mutation<IAccountInfo, ICreateAccountArgs>({
      query: ({ currency, accountType, isMain, customerId }) => ({
        url: ACCOUNTS_URL.userAccounts,
        method: 'POST',
        headers: {
          'X-Customer-Id': customerId,
        },
        body: { currency, accountType, isMain },
      }),
      invalidatesTags: ['AllAccounts'],
    }),
    getMyBill: build.query<IAccountInfo, string>({
      query: (id) => ({
        url: `${ACCOUNTS_URL.userAccounts}/${id}`,
        params: { id },
      }),
    }),
    changeAccountName: build.mutation<IResponseName, IChangeName>({
      query: ({ id, accountName }) => ({
        url: `${ACCOUNTS_URL.userAccounts}/${id}`,
        method: 'PATCH',
        body: { accountName },
      }),
      invalidatesTags: ['AllAccounts'],
    }),
    changeIsMain: build.mutation<IResponseIsMain, IChangeIsMain>({
      query: ({ id, isMain }) => ({
        url: `${ACCOUNTS_URL.userAccounts}/${id}`,
        method: 'PATCH',
        body: { isMain },
      }),
      invalidatesTags: ['AllAccounts'],
    }),
    getRequisites: build.query<IRequisitesApiResponse, string>({
      query: (id) => ({
        url: `${ACCOUNTS_URL.userAccounts}/${id}/${ACCOUNTS_URL.accountRequisites}`,
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllAccountsQuery,
  useGetActiveAccountsByCurrencyQuery,
  useLazyGetAllAccountsQuery,
  useChangeAccountStatusMutation,
  useCreateCurrentAccountMutation,
  useGetMyBillQuery,
  useLazyGetMyBillQuery,
  useChangeAccountNameMutation,
  useChangeIsMainMutation,
  useGetRequisitesQuery,
  useLazyGetRequisitesQuery,
} = accountsApi;
