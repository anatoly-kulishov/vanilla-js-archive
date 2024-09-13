import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  IRequestUpdateEmail,
  IResponseCustomerInfo,
  IResponseCustomerNotifications,
  IChangeNotifications,
  IQueryCustomerInfo,
  IAccessToken,
} from '../..';
import { URLS } from '../constants.ts';
import { CUSTOMER } from './constants.ts';

export const customerApi = createApi({
  reducerPath: 'customerService',
  baseQuery: fetchBaseQuery({
    baseUrl: URLS.CUSTOMER,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  tagTypes: ['Notifications', 'Info'],
  endpoints: (build) => ({
    changeEmail: build.mutation<void, IRequestUpdateEmail & IAccessToken>({
      query: ({ email, accessToken }) => ({
        url: CUSTOMER.changeEmail,
        method: 'PATCH',
        body: {
          email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['Info'],
    }),
    getCustomerInfo: build.query<IResponseCustomerInfo, IQueryCustomerInfo>({
      query: ({ customerId, accessToken }) => ({
        url: CUSTOMER.getCustomerInfo,
        method: 'GET',
        params: {
          customerId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ['Info'],
    }),
    getCustomerNotifications: build.query<
      IResponseCustomerNotifications,
      { customerId: string } & IAccessToken
    >({
      query: ({ customerId, accessToken }) => ({
        url: CUSTOMER.getCustomerNotifications,
        method: 'GET',
        params: {
          customerId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ['Notifications'],
    }),
    changeNotifications: build.mutation<void, IChangeNotifications>({
      query: (request) => ({
        url: `${CUSTOMER.getCustomerNotifications}/${request.type}`,
        method: 'PATCH',
        params: {
          customerId: request.customerId,
        },
        body: { notificationStatus: request.notificationStatus },
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useChangeEmailMutation,
  useLazyGetCustomerInfoQuery,
  useGetCustomerInfoQuery,
  useGetCustomerNotificationsQuery,
  useChangeNotificationsMutation,
} = customerApi;
