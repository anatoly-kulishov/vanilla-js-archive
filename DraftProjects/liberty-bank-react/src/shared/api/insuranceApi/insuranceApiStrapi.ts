import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/dist/query/react';
import { IInsuranceData, IInsuranceResponce, IInsuranceGroupsProducts } from '.';
import { INSURANCE_STRAPI_URL, MAX_RETRIES, tokenStrapi } from './constants';

export const insuranceApiStrapi = createApi({
  reducerPath: 'insuranceStrapiProduct',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: INSURANCE_STRAPI_URL.baseInsurance,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenStrapi,
      },
    }),
    { maxRetries: MAX_RETRIES },
  ),
  endpoints: (builder) => ({
    getStrapiInsuranceProduct: builder.query<IInsuranceData, string>({
      query: (id) => ({
        url: `${INSURANCE_STRAPI_URL.insuranceProduct}`,
        method: 'GET',
        params: {
          'filters[product_id][0]': id,
          populate: 'deep',
        },
      }),
      transformResponse: (response: IInsuranceResponce) => {
        const data = response['data'][0]['attributes'];
        const result = {} as IInsuranceData;
        result.productName = data['insurance_product']['data']['attributes']['productName'];
        result.productDescription =
          data['insurance_product']['data']['attributes']['productDescription'];
        if (Array.isArray(data.catalog_info)) {
          result.catalogInfo = data.catalog_info;
        }
        result.requiredDocuments =
          data['insurance_product']['data']['attributes']['requiredDocuments'];
        return result;
      },
    }),
    getStrapiInsuranceGroupsProduct: builder.query<IInsuranceGroupsProducts, string>({
      query: (groupId) => ({
        url: `${INSURANCE_STRAPI_URL.groupProducts}`,
        method: 'GET',
        params: {
          'filters[group_id]': groupId,
          populate: 'deep',
        },
      }),
    }),
  }),
});

export const { useGetStrapiInsuranceProductQuery, useGetStrapiInsuranceGroupsProductQuery } =
  insuranceApiStrapi;
