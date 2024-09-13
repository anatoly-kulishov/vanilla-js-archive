import { IApplicationResponse } from './../../../features/createInsuranceApplicationRequest/model/types/types';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/dist/query/react';
import {
  IInsuranceAllPolicies,
  IInsurancePolicies,
  TAllConcretePolicyDetailsDto,
  IInsurancePopularProducts,
  IInsuranceAttributes,
  IInsuranceCalculationsPolicy,
  IInsuranceCalculationsPolicyResponse,
  IInsuranceThingApplication,
  IApplicationOfflineRequest,
  IInsuranceOrders,
} from '.';
import { INSURANCE_URL, MAX_RETRIES } from './constants';

export const insuranceApi = createApi({
  reducerPath: 'insuranceProduct',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: INSURANCE_URL.baseInsurance,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: token,
      },
    }),
    { maxRetries: MAX_RETRIES },
  ),
  endpoints: (builder) => ({
    getInsuranceProduct: builder.query<IInsuranceAttributes, string>({
      query: (id) => ({
        url: `${INSURANCE_URL.insuranceProduct}/${id}`,
        method: 'GET',
      }),
    }),
    getInsurancePopularProducts: builder.query<IInsurancePopularProducts, void>({
      query: () => ({
        url: `${INSURANCE_URL.insurancePopularProducts}`,
        method: 'GET',
      }),
    }),
    getInsuranceAllPolicies: builder.query<IInsuranceAllPolicies, string>({
      query: (clientId) => ({
        url: `${INSURANCE_URL.insurancePolicies}/`,
        method: 'GET',
        headers: {
          clientId,
        },
      }),
      transformResponse: (response: IInsuranceAllPolicies) => {
        response.policies.sort(
          (obj1, obj2) =>
            new Date(obj2.expirationDate).getTime() - new Date(obj1.expirationDate).getTime(),
        );
        return response;
      },
    }),
    getInsurancePolicies: builder.query<IInsurancePolicies<TAllConcretePolicyDetailsDto>, string>({
      query: (policyId) => ({
        url: `${INSURANCE_URL.insurancePolicies}/${policyId}`,
        method: 'GET',
      }),
      transformResponse: (response: IInsurancePolicies<TAllConcretePolicyDetailsDto>) => {
        if (
          'brand' in response.concretePolicyDetailsDto &&
          'model' in response.concretePolicyDetailsDto
        ) {
          response.concretePolicyDetailsDto.fullName =
            response.concretePolicyDetailsDto.brand + ' ' + response.concretePolicyDetailsDto.model;
        }
        if ('price' in response.concretePolicyDetailsDto) {
          response.concretePolicyDetailsDto.insuranceSum = response.concretePolicyDetailsDto.price;
        }
        if ('things' in (response.concretePolicyDetailsDto as IInsuranceThingApplication)) {
          (response.concretePolicyDetailsDto as IInsuranceThingApplication).insuranceSum = (
            response.concretePolicyDetailsDto as IInsuranceThingApplication
          ).things[0].cost;
        }
        if ('estimatedValue' in response.concretePolicyDetailsDto) {
          response.concretePolicyDetailsDto.insuranceSum =
            response.concretePolicyDetailsDto.estimatedValue;
          response.concretePolicyDetailsDto.location = response.concretePolicyDetailsDto.address;
          response.concretePolicyDetailsDto.things = [{ name: 'Дом', type: 'HOUSE', cost: 0 }];
        }
        return response;
      },
    }),
    getInsuranceCalculationsPolicy: builder.mutation<
      IInsuranceCalculationsPolicyResponse,
      IInsuranceCalculationsPolicy
    >({
      query: (body) => ({
        url: INSURANCE_URL.insuranceCalculationsPolicy,
        method: 'POST',
        body,
      }),
    }),
    createApplicationOffline: builder.mutation<IApplicationResponse, IApplicationOfflineRequest>({
      query: (data) => ({
        url: INSURANCE_URL.insuranceApplicationOffline,
        method: 'POST',
        headers: {
          clientId: data.headers,
        },
        body: { ...data.body },
      }),
    }),
    getInsuranceOrders: builder.query<IInsuranceOrders[], string>({
      query: (clientId) => ({
        url: INSURANCE_URL.insuranceOrders,
        method: 'GET',
        headers: {
          clientID: clientId,
        },
      }),
    }),
  }),
});

export const {
  useGetInsuranceProductQuery,
  useGetInsurancePopularProductsQuery,
  useGetInsuranceAllPoliciesQuery,
  useGetInsurancePoliciesQuery,
  useCreateApplicationOfflineMutation,
  useGetInsuranceCalculationsPolicyMutation,
  useGetInsuranceOrdersQuery,
} = insuranceApi;
