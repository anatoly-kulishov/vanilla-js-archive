import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BANK_BRANCHES_SERVICE } from './constants';
import { BankBranch, CitiesList, CityBranch } from './types';
import { URLS } from '../../constants';

export const bankBranchesServiceApi = createApi({
  reducerPath: 'bankBranchesService',
  baseQuery: fetchBaseQuery({
    baseUrl: URLS.BANK_BRANCHES,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (build) => ({
    citiesList: build.query<CitiesList, void>({
      query: () => BANK_BRANCHES_SERVICE.citiesList,
    }),
    popularCities: build.query<CitiesList, void>({
      query: () => BANK_BRANCHES_SERVICE.popularCities,
    }),
    searchCities: build.query<string[], string>({
      query: (str) => ({
        url: BANK_BRANCHES_SERVICE.searchCities,
        params: { city: str },
      }),
    }),
    bankBranch: build.query<CityBranch[], number>({
      query: (id) => ({
        url: BANK_BRANCHES_SERVICE.bankBranch,
        params: { ['bank_branch_city_id']: id, size: 100 },
      }),
    }),
    getBankBranchesInfo: build.query<BankBranch[], { city?: string; officeNumber?: string }>({
      query: ({ city, officeNumber }) => {
        const params = Object.entries({ city, officeNumber })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value !== undefined)
          .reduce(
            (acc, [key, value]) => ({ ...acc, [key === 'city' ? 'address.city' : key]: value }),
            {},
          );

        return {
          url: BANK_BRANCHES_SERVICE.bankBranch,
          params,
        };
      },
      transformResponse: (response: BankBranch[]) => {
        // TODO: Пока не принято решение показываем ли только открытые
        return response.filter((branch) => !branch.isClosed);
      },
    }),
  }),
});

export const {
  useCitiesListQuery,
  usePopularCitiesQuery,
  useSearchCitiesQuery,
  useBankBranchQuery,
  useLazyGetBankBranchesInfoQuery,
} = bankBranchesServiceApi;
