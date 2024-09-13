import type { IApplicationResponse, IApplication, IDocumentsResponse } from '../model/types';
import { insuranceApi } from '@/shared';
// TODO изменить значение clientId, когда будет регистрация
export const createApplicationRequestApi = insuranceApi.injectEndpoints({
  endpoints: (builder) => ({
    createApplicationRequest: builder.mutation<IApplicationResponse, IApplication>({
      query: (body) => ({
        url: '/insurance-service/api/v1/insurance/applications',
        method: 'POST',
        headers: {
          clientId: '813f5509-7696-44be-a321-3a094c48a6e7',
        },
        body,
      }),
    }),
    createDocumentsRequest: builder.mutation<IDocumentsResponse, FormData>({
      query: (body) => ({
        url: '/insurance-service/api/v1/insurance-documents/auto/upload',
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateApplicationRequestMutation, useCreateDocumentsRequestMutation } =
  createApplicationRequestApi;
