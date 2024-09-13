import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sha256 } from 'js-sha256';
import { IChangePassword, IRequestLogin, IToken, setTokensIntoStorage } from '../..';
import { URLS } from '../constants.ts';
import { AUTH } from './constants.ts';
import {
  IAccessToken,
  ICreatePassword,
  IPasswordRecovery,
  IReqVerificationByCode,
  IResVerificationByCode,
  ISmsTimer,
} from './interfaces.ts';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: URLS.CUSTOMER,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<IToken, IRequestLogin>({
      async queryFn(body, _queryApi, _extraOptions, fetchWithBQ) {
        const loginResult = await fetchWithBQ({
          url: AUTH.login,
          method: 'POST',
          body: { ...body, password: btoa(sha256(body.password)) },
        });
        if (loginResult.error) {
          return { error: loginResult.error as FetchBaseQueryError };
        }
        setTokensIntoStorage(loginResult.data as IToken);
        return { data: loginResult.data as IToken };
      },
    }),
    changePassword: build.mutation<void, IChangePassword & IAccessToken>({
      query: ({ password, newPassword, accessToken }) => ({
        url: AUTH.changePassword,
        method: 'PATCH',
        body: {
          password: btoa(sha256(password)),
          newPassword: btoa(sha256(newPassword)),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    phoneVerification: build.query<void, string>({
      query: (phone) => AUTH.phoneVerification + `/${phone}`,
    }),
    requestVerificationCode: build.mutation<ISmsTimer, string>({
      query: (phone) => ({
        url: AUTH.requestVerificationCode,
        method: 'PATCH',
        body: {
          mobilePhone: phone,
        },
      }),
    }),
    verificationByCode: build.mutation<IResVerificationByCode, IReqVerificationByCode>({
      query: ({ mobilePhone, verificationCode }) => ({
        url: AUTH.verificationByCode,
        method: 'POST',
        body: {
          mobilePhone,
          verificationCode,
        },
      }),
    }),
    passwordRecovery: build.mutation<void, IPasswordRecovery>({
      query: ({ newPassword, sessionToken }) => ({
        url: AUTH.passwordRecovery,
        method: 'PATCH',
        body: {
          newPassword: btoa(sha256(newPassword)),
        },
        headers: {
          Registration: sessionToken,
        },
      }),
    }),
    createPassword: build.mutation<ISmsTimer, ICreatePassword>({
      query: ({ sessionToken, password }) => ({
        url: AUTH.createPassword,
        method: 'PATCH',
        body: {
          newPassword: btoa(sha256(password)),
        },
        headers: {
          Registration: `Bearer ${sessionToken}`,
        },
      }),
    }),
    updateToken: build.mutation<IToken, Pick<IToken, 'refreshToken'>>({
      query: ({ refreshToken }) => ({
        url: AUTH.updateToken,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useLazyPhoneVerificationQuery,
  useRequestVerificationCodeMutation,
  useVerificationByCodeMutation,
  usePasswordRecoveryMutation,
  useCreatePasswordMutation,
  useUpdateTokenMutation,
} = authApi;
