import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REQUEST_STATUSES, CHANGE_STATUS_CARD, getAccessToken } from '@/shared';
import { CARDS_URL } from './constants';
import {
  IArgs,
  ICard,
  ICardInfo,
  IResponseStatus,
  IChangeCardStatusArgs,
  IChangeCardPIN,
  ISetFavorite,
  CardOrderResponse,
  ICardOrderRequest,
  ICardTariffsResponse,
  IGetTariffs,
  IGroupedCardProductsResponse,
  ICardProductBenefitsResponse,
  IChangeCardLimits,
  ICreditCardProduct,
  ICreditCardProductInfo,
  ICreditCardOrderRequest,
  ICreditCardOrderResponse,
  IDebitCardProduct,
  IDebitCardProductsResponse,
  ICreditCardRequest,
  ICreditCard,
  IUserCreditCard,
  IChangeCardCardPIN,
} from './interfaces';
import { sortUserCards, transformCreditCardProducts, transformDebitCardProducts } from './lib';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['AllCards', 'Card', 'CreditCards'],
  baseQuery: fetchBaseQuery({
    baseUrl: CARDS_URL.baseCards,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserCards: build.query<ICard[], string>({
      query: (customerId) => ({
        url: CARDS_URL.userCards,
        params: {
          customerId,
        },
      }),
      providesTags: ['AllCards'],
      transformResponse: sortUserCards,
    }),
    getUserCreditCards: build.query<ICreditCard[], void>({
      query: () => ({
        url: CARDS_URL.userCreditCards,
      }),
    }),
    getUserCreditCard: build.query<IUserCreditCard, string>({
      query: (id) => ({
        url: `${CARDS_URL.userCreditCards}/${id}`,
      }),
    }),
    getMyCardInfo: build.query<ICardInfo, IArgs>({
      query: ({ cardId, customerId }) => ({
        url: `${CARDS_URL.userCards}/${cardId}`,
        headers: { 'X-Customer-Id': customerId },
      }),
      providesTags: ['Card'],
    }),
    postCardOrder: build.mutation<CardOrderResponse, ICardOrderRequest>({
      query: ({ ...params }) => {
        const body = Object.entries(params)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        return {
          url: CARDS_URL.userCards,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AllCards'],
    }),
    changeCardStatus: build.mutation<IResponseStatus, IChangeCardStatusArgs>({
      query: ({ cardId, cardStatus, customerId }) => ({
        url: `${CARDS_URL.userCards}/${cardId}`,
        method: 'PATCH',
        headers: { 'X-Customer-Id': customerId },
        body: { cardStatus },
      }),
      invalidatesTags: ['AllCards', 'Card'],
    }),
    changePIN: build.mutation<IResponseStatus, IChangeCardPIN>({
      query: ({ id, oldPincode, newPincode, customerId }) => ({
        url: `${CARDS_URL.userCards}/${id}`,
        method: 'PATCH',
        headers: { 'X-Customer-Id': customerId },
        body: { oldPincode, newPincode },
      }),
      invalidatesTags: ['AllCards', 'Card'],
    }),
    changeCreditCardPIN: build.mutation<void, IChangeCardCardPIN>({
      query: ({ id, pin }) => ({
        url: CARDS_URL.changeCreditCardPIN,
        method: 'PATCH',
        body: { id, pin },
      }),
    }),
    setFavoriteStatus: build.mutation<IResponseStatus, ISetFavorite>({
      query: ({ id, favourite, customerId }) => ({
        url: `${CARDS_URL.userCards}/${id}`,
        method: 'PATCH',
        headers: { 'X-Customer-Id': customerId },
        body: { favourite },
      }),
      invalidatesTags: ['AllCards', 'Card'],
    }),
    changeLimits: build.mutation<IResponseStatus, IChangeCardLimits>({
      query: ({ id, customerId, ...body }) => ({
        url: `${CARDS_URL.userCards}/${id}`,
        method: 'PATCH',
        headers: { 'X-Customer-Id': customerId },
        body: {
          body,
        },
      }),
    }),
    getCardProducts: build.query<IDebitCardProduct[] | IDebitCardProductsResponse, 'raw' | void>({
      query: () => ({
        url: CARDS_URL.cardProducts,
      }),
      transformResponse: transformDebitCardProducts,
    }),
    getCreditCardProducts: build.query<ICreditCardProduct[], void>({
      query: () => ({
        url: CARDS_URL.creditCardProducts,
      }),
      transformResponse: transformCreditCardProducts,
    }),
    getCardTariffs: build.query<ICardTariffsResponse, IGetTariffs>({
      query: ({ customerId, cardId }) => ({
        url: `${CARDS_URL.userCards}/${cardId}/${CARDS_URL.cardTariffs}`,
        headers: { 'X-Customer-Id': customerId },
      }),
    }),
    getGroupedCardProducts: build.query<IGroupedCardProductsResponse[], string>({
      query: (productTypeName) => ({
        url: `${CARDS_URL.groupedCardProducts}/${productTypeName}`,
      }),
    }),
    getCardProductBenefits: build.query<ICardProductBenefitsResponse, string>({
      query: (productTypeName) => ({
        url: `${CARDS_URL.cardProductBenefits}/${productTypeName}`,
      }),
    }),
    getCreditCardProductInfo: build.query<ICreditCardProductInfo, string>({
      query: (creditCardId) => ({
        url: `${CARDS_URL.creditCardProducts}/${creditCardId}`,
      }),
    }),
    postCreditCardOrder: build.mutation<ICreditCardOrderResponse, ICreditCardOrderRequest>({
      query: (data) => ({
        url: CARDS_URL.creditCardOrders,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CreditCards'],
    }),
    getCreditCardRequests: build.query<ICreditCardRequest[], void>({
      query: () => CARDS_URL.creditCardOrders,
      providesTags: ['CreditCards'],
    }),
    cancelOrderCard: build.mutation<void, string>({
      query: (id) => ({
        url: `${CARDS_URL.creditCardOrders}/${id}`,
        method: 'PATCH',
        body: {
          status: REQUEST_STATUSES.WITHDRAWN,
        },
      }),
      invalidatesTags: ['CreditCards'],
    }),
    blockCard: build.mutation<void, string>({
      query: (id) => ({
        url: `${CARDS_URL.blockCreditCard}/${id}`,
        method: 'PATCH',
        body: {
          id,
          status: CHANGE_STATUS_CARD.BLOCK,
        },
      }),
      invalidatesTags: ['CreditCards'],
    }),
    unBlockCard: build.mutation<void, string>({
      query: (id) => ({
        url: `${CARDS_URL.unBlockCreditCard}/${id}`,
        method: 'PATCH',
        body: {
          id,
          status: CHANGE_STATUS_CARD.UNBLOCK,
        },
      }),
      invalidatesTags: ['CreditCards'],
    }),
    closeCard: build.mutation<void, { id: string; customer: string }>({
      query: ({ id, customer }) => ({
        url: CARDS_URL.closeCreditCard,
        method: 'PATCH',
        body: {
          id,
          customer,
        },
      }),
      invalidatesTags: ['CreditCards'],
    }),
  }),
});

export const {
  useGetUserCardsQuery,
  useGetUserCreditCardsQuery,
  useGetUserCreditCardQuery,
  useChangeLimitsMutation,
  useGetMyCardInfoQuery,
  usePostCardOrderMutation,
  useGetCardProductsQuery,
  useGetCreditCardProductsQuery,
  useChangeCardStatusMutation,
  useChangePINMutation,
  useChangeCreditCardPINMutation,
  useSetFavoriteStatusMutation,
  useGetCardTariffsQuery,
  useGetGroupedCardProductsQuery,
  useGetCardProductBenefitsQuery,
  useGetCreditCardProductInfoQuery,
  usePostCreditCardOrderMutation,
  useGetCreditCardRequestsQuery,
  useCancelOrderCardMutation,
  useBlockCardMutation,
  useUnBlockCardMutation,
  useCloseCardMutation,
} = cardsApi;
