import { RootState } from '@/app/appStore';
import { INewsItem } from '@/pages/investmentLKanalytics/InvestmentLKAnalyticsMain/accordionForNews/accordionItem/AccordionItem';
import { ISingleNews } from '@/pages/investmentLKnews/investmentLKnewsSingleNews/ui/investmentLKnewsSingleNews';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IApiResponse,
  IResponseInvestClosingStatement,
  IResponseInvestUserInfo,
  SmsResponce,
} from '../..';
import { INVEST_URL } from './constants';
import { IArticle, IArticleResponse, IArticlesParams, IAssetParams, IAssetResponse } from './types';

interface IProps {
  data: IResponseInvestUserInfo;
}

interface IOptions {
  brokerId: string;
}

interface SmsOpenQueryParams {
  pin: string;
  documentId: string | undefined;
}

interface SmsCloseQueryParams {
  pin: string;
  brokerAccountId?: string;
}

interface BrokerAccountOpenProps {
  accountName?: string;
  currencyCode: string;
}

interface AuthRequest {
  userHaveActiveBrokerAccount: boolean;
}

interface BrokerAccountName {
  customerId: string;
  name: string;
}

interface IInvestmentNews {
  content: INewsItem[];
}

interface IInvestmentArticles {
  content: IArticleResponse[];
}

export const investmentApi = createApi({
  reducerPath: 'investApi',
  baseQuery: fetchBaseQuery({
    baseUrl: INVEST_URL.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authToken.accessToken;
      headers.set('Content-type', 'application/json; application/pdf');
      token && headers.set('Authorization', `Bearer ${token?.replace(/"/g, '')}`);
      return headers;
    },
  }),

  endpoints: (build) => ({
    getInvestUserInfo: build.query<IResponseInvestUserInfo, void>({
      query: () => ({
        url: `${INVEST_URL.investUserInfo}`,
      }),
    }),
    getSmsSend: build.query<SmsResponce, void>({
      query: () => ({
        url: `${INVEST_URL.investSmsSend}`,
      }),
    }),
    postCustomerAuth: build.mutation<AuthRequest, void>({
      query: () => ({
        url: `${INVEST_URL.investCustomerAuth}`,
        method: 'POST',
      }),
    }),
    postBrokerAccountOpen: build.mutation<
      { documentId: string | undefined },
      BrokerAccountOpenProps
    >({
      query: ({ accountName, currencyCode }) => ({
        url: `${INVEST_URL.investBrokerAccountOpen}`,
        method: 'POST',
        body: { accountName, currencyCode },
      }),
    }),

    postQuestionnaireQuestions: build.mutation<IResponseInvestUserInfo, IProps>({
      query: ({ data }) => ({
        url: `${INVEST_URL.investUserInfo}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    postInvestSmsVerification: build.mutation<IApiResponse, SmsOpenQueryParams>({
      query: ({ pin, documentId }) => ({
        url: `${INVEST_URL.investSmsVerificationAccountOpen}`,
        method: 'POST',
        body: { pin, documentId },
      }),
    }),
    postInvestSmsVerificationClose: build.mutation<IApiResponse, SmsCloseQueryParams>({
      query: ({ pin, brokerAccountId }) => ({
        url: `${INVEST_URL.investSmsVerificationAccountClose}`,
        method: 'POST',
        body: { pin, brokerAccountId },
      }),
    }),
    getBrokerAccountNumber: build.query<BrokerAccountName, void>({
      query: () => `${INVEST_URL.investAllBrokerAccounts}`,
    }),
    getBrokerAccountId: build.query<{ brokerAccountId: string }, void>({
      query: () => `${INVEST_URL.investBrokerAccId}`,
    }),
    getInvestClosingStatement: build.query<IResponseInvestClosingStatement, IOptions>({
      query: ({ brokerId }) => `${INVEST_URL.investBrokerAcc}/${brokerId}/data`,
    }),
    getInvestClosingStatementPDF: build.query<IResponseInvestClosingStatement, IOptions>({
      query: ({ brokerId }) => `${INVEST_URL.investBrokerAcc}/${brokerId}`,
    }),
    getInvestClosingSms: build.query<SmsResponce, void>({
      query: () => `${INVEST_URL.investBrokerAcc}/close`,
    }),
    getInvestmentNews: build.query<INewsItem[], void>({
      query: () => ({
        url: `${INVEST_URL.investNews}`,
      }),
      transformResponse: (response: IInvestmentNews) => response.content,
    }),
    getInvestmentSingleNews: build.query<ISingleNews, string>({
      query: (id) => ({
        url: `${INVEST_URL.investSingleNews}/${id}`,
      }),
    }),
    getInvestmentArticlesFeed: build.query<IArticle[], IArticlesParams>({
      query: (params) => ({
        url: `${INVEST_URL.investArticlesFeed}`,
        params,
      }),
      transformResponse: (response: IInvestmentArticles) => {
        return response.content.map((item) => {
          return { ...item, tagType: item.tagType.split(',') };
        });
      },
    }),
    getInvestmentSingleArticle: build.query<IArticle, string>({
      query: (id) => ({
        url: `${INVEST_URL.investArticles}/${id}`,
      }),
    }),
    getInvestmentAsset: build.query<IAssetResponse, IAssetParams>({
      query: (ticker) => ({
        url: `${INVEST_URL.investAsset}/${ticker}`,
      }),
    }),
    getInvestmentPersonalDocument: build.query<Blob, string>({
      query: (docName) => ({
        url: `${INVEST_URL.investPersonalDocument}/${docName}`,
        responseType: 'blob',
        responseHandler: (response) => response.blob(),
        cache: 'no-cache',
      }),
    }),
    getInvestmentCommonDocument: build.query<Blob, string>({
      query: (docName) => ({
        url: `${INVEST_URL.investCommonDocument}/${docName}`,
        responseType: 'blob',
        responseHandler: (response) => response.blob(),
        cache: 'no-cache',
      }),
    }),
  }),
});

export const {
  useLazyGetInvestUserInfoQuery,
  useLazyGetSmsSendQuery,
  usePostCustomerAuthMutation,
  usePostBrokerAccountOpenMutation,
  usePostQuestionnaireQuestionsMutation,
  usePostInvestSmsVerificationMutation,
  usePostInvestSmsVerificationCloseMutation,
  useLazyGetBrokerAccountNumberQuery,
  useLazyGetBrokerAccountIdQuery,
  useLazyGetInvestClosingStatementQuery,
  useLazyGetInvestClosingStatementPDFQuery,
  useLazyGetInvestClosingSmsQuery,
  useLazyGetInvestmentNewsQuery,
  useGetInvestmentNewsQuery,
  useLazyGetInvestmentSingleNewsQuery,
  useLazyGetInvestmentArticlesFeedQuery,
  useLazyGetInvestmentSingleArticleQuery,
  useGetInvestmentAssetQuery,
  useLazyGetInvestmentPersonalDocumentQuery,
  useLazyGetInvestmentCommonDocumentQuery,
} = investmentApi;
