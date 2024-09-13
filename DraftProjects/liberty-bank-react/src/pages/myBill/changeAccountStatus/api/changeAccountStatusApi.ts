import { baseAccountsApi } from '@/shared/api/baseAccountsApi';
import { IResponseStatus, IСhangeStatusArgs } from '../model';

export const changeAccountStatusApi = baseAccountsApi.injectEndpoints({
  endpoints: (build) => ({
    changeAccountStatus: build.mutation<IResponseStatus, IСhangeStatusArgs>({
      query: ({ id, status }) => ({
        url: `/account-service/api/v1/accounts/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const { useChangeAccountStatusMutation } = changeAccountStatusApi;
